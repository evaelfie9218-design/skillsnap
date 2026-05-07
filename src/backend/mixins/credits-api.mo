import Map "mo:core/Map";
import Set "mo:core/Set";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import CreditsLib "../lib/credits";
import SkillTypes "../types/skill";
import UserTypes "../types/user";
import CommonTypes "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  skills : Map.Map<CommonTypes.SkillId, SkillTypes.Skill>,
  profiles : Map.Map<CommonTypes.UserId, UserTypes.UserProfile>,
  unlocks : Map.Map<CommonTypes.UserId, Set.Set<CommonTypes.SkillId>>,
) {
  public shared ({ caller }) func unlockSkill(skillId : CommonTypes.SkillId) : async CommonTypes.Result<(), Text> {
    if (caller.isAnonymous()) {
      return #err("Must be authenticated");
    };
    CreditsLib.unlockSkill(skills, profiles, unlocks, caller, skillId);
  };

  public query ({ caller }) func isUnlocked(skillId : CommonTypes.SkillId) : async Bool {
    CreditsLib.isUnlocked(unlocks, caller, skillId);
  };
};
