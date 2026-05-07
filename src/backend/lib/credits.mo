import Map "mo:core/Map";
import Set "mo:core/Set";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import UserTypes "../types/user";
import SkillTypes "../types/skill";
import CommonTypes "../types/common";

module {
  public func unlockSkill(
    skills : Map.Map<CommonTypes.SkillId, SkillTypes.Skill>,
    profiles : Map.Map<CommonTypes.UserId, UserTypes.UserProfile>,
    unlocks : Map.Map<CommonTypes.UserId, Set.Set<CommonTypes.SkillId>>,
    caller : CommonTypes.UserId,
    skillId : CommonTypes.SkillId,
  ) : CommonTypes.Result<(), Text> {
    switch (skills.get(skillId)) {
      case null { #err("Skill not found") };
      case (?skill) {
        if (Principal.equal(skill.userId, caller)) {
          return #err("Cannot unlock your own skill");
        };
        if (isUnlocked(unlocks, caller, skillId)) {
          return #err("Already unlocked");
        };
        switch (profiles.get(caller)) {
          case null { #err("Profile not found") };
          case (?callerProfile) {
            if (callerProfile.credits < 1) {
              return #err("Insufficient credits");
            };
            callerProfile.credits -= 1;
            // Add to caller's unlocks
            let userUnlocks = switch (unlocks.get(caller)) {
              case (?s) { s };
              case null {
                let s = Set.empty<CommonTypes.SkillId>();
                unlocks.add(caller, s);
                s;
              };
            };
            userUnlocks.add(skillId);
            // Award creator
            switch (profiles.get(skill.userId)) {
              case null {};
              case (?creatorProfile) {
                creatorProfile.credits += 1;
                creatorProfile.creditsEarned += 1;
              };
            };
            #ok(());
          };
        };
      };
    };
  };

  public func isUnlocked(
    unlocks : Map.Map<CommonTypes.UserId, Set.Set<CommonTypes.SkillId>>,
    caller : CommonTypes.UserId,
    skillId : CommonTypes.SkillId,
  ) : Bool {
    switch (unlocks.get(caller)) {
      case null { false };
      case (?s) { s.contains(skillId) };
    };
  };

  // Composite key for rating records: "userId:skillId"
  public func ratingKey(userId : CommonTypes.UserId, skillId : CommonTypes.SkillId) : Text {
    userId.toText() # ":" # skillId;
  };
};
