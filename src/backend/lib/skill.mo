import Map "mo:core/Map";
import Set "mo:core/Set";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Types "../types/skill";
import UserTypes "../types/user";
import CommonTypes "../types/common";
import Float "mo:core/Float";


module {
    // Private helper: check if caller has unlocked a skill
  func isUnlockedFor(
    unlocks : Map.Map<CommonTypes.UserId, Set.Set<CommonTypes.SkillId>>,
    caller : CommonTypes.UserId,
    skillId : CommonTypes.SkillId,
  ) : Bool {
    switch (unlocks.get(caller)) {
      case null { false };
      case (?s) { s.contains(skillId) };
    };
  };

public func createSkill(
    skills : Map.Map<CommonTypes.SkillId, Types.Skill>,
    profiles : Map.Map<CommonTypes.UserId, UserTypes.UserProfile>,
    nextId : Nat,
    caller : CommonTypes.UserId,
    title : Text,
    audioUrl : Text,
    category : Text,
    tags : [Text],
  ) : CommonTypes.Result<CommonTypes.SkillId, Text> {
    let skillId = "skill-" # nextId.toText();
    let skill : Types.Skill = {
      skillId;
      userId = caller;
      title;
      audioUrl;
      category;
      tags;
      var rating = 0.0;
      var ratingCount = 0;
      var ratingSum = 0;
      durationSeconds = 10;
      createdAt = Time.now();
    };
    skills.add(skillId, skill);
    switch (profiles.get(caller)) {
      case (?p) { p.skillCount += 1 };
      case null {};
    };
    #ok(skillId);
  };

  public func getSkill(
    skills : Map.Map<CommonTypes.SkillId, Types.Skill>,
    profiles : Map.Map<CommonTypes.UserId, UserTypes.UserProfile>,
    unlocks : Map.Map<CommonTypes.UserId, Set.Set<CommonTypes.SkillId>>,
    skillId : CommonTypes.SkillId,
    caller : CommonTypes.UserId,
  ) : ?Types.SkillWithMeta {
    switch (skills.get(skillId)) {
      case null { null };
      case (?skill) {
        let creatorName = switch (profiles.get(skill.userId)) {
          case (?p) { p.name };
          case null { "" };
        };
        let unlocked = Principal.equal(skill.userId, caller) or isUnlockedFor(unlocks, caller, skillId);
        ?toMeta(skill, creatorName, unlocked);
      };
    };
  };

  public func listSkills(
    skills : Map.Map<CommonTypes.SkillId, Types.Skill>,
    profiles : Map.Map<CommonTypes.UserId, UserTypes.UserProfile>,
    unlocks : Map.Map<CommonTypes.UserId, Set.Set<CommonTypes.SkillId>>,
    filterOpts : Types.SkillFilter,
    caller : CommonTypes.UserId,
  ) : [Types.SkillWithMeta] {
    skills.entries().filterMap<(CommonTypes.SkillId, Types.Skill), Types.SkillWithMeta>(
      func((_, skill)) {
        let categoryMatch = switch (filterOpts.category) {
          case null { true };
          case (?cat) { skill.category == cat };
        };
        let tagMatch = switch (filterOpts.tag) {
          case null { true };
          case (?t) { skill.tags.find(func(tag) { tag == t }) != null };
        };
        let searchMatch = switch (filterOpts.search) {
          case null { true };
          case (?q) { skill.title.toLower().contains(#text(q.toLower())) };
        };
        if (categoryMatch and tagMatch and searchMatch) {
          let creatorName = switch (profiles.get(skill.userId)) {
            case (?p) { p.name };
            case null { "" };
          };
          let unlocked = Principal.equal(skill.userId, caller) or isUnlockedFor(unlocks, caller, skill.skillId);
          ?toMeta(skill, creatorName, unlocked);
        } else { null };
      }
    ).toArray();
  };

  public func getMySkills(
    skills : Map.Map<CommonTypes.SkillId, Types.Skill>,
    profiles : Map.Map<CommonTypes.UserId, UserTypes.UserProfile>,
    _unlocks : Map.Map<CommonTypes.UserId, Set.Set<CommonTypes.SkillId>>,
    caller : CommonTypes.UserId,
  ) : [Types.SkillWithMeta] {
    let callerName = switch (profiles.get(caller)) {
      case (?p) { p.name };
      case null { "" };
    };
    skills.entries().filterMap<(CommonTypes.SkillId, Types.Skill), Types.SkillWithMeta>(
      func((_, skill)) {
        if (Principal.equal(skill.userId, caller)) {
          ?toMeta(skill, callerName, true);
        } else { null };
      }
    ).toArray();
  };

  public func rateSkill(
    skills : Map.Map<CommonTypes.SkillId, Types.Skill>,
    profiles : Map.Map<CommonTypes.UserId, UserTypes.UserProfile>,
    unlocks : Map.Map<CommonTypes.UserId, Set.Set<CommonTypes.SkillId>>,
    ratings : Map.Map<Text, Nat>,
    caller : CommonTypes.UserId,
    skillId : CommonTypes.SkillId,
    rating : Nat,
  ) : CommonTypes.Result<(), Text> {
    if (rating < 1 or rating > 5) {
      return #err("Rating must be between 1 and 5");
    };
    switch (skills.get(skillId)) {
      case null { #err("Skill not found") };
      case (?skill) {
        let unlocked = Principal.equal(skill.userId, caller) or isUnlockedFor(unlocks, caller, skillId);
        if (not unlocked) {
          return #err("Must unlock skill before rating");
        };
        let key = caller.toText() # ":" # skillId;
        let prevRating = ratings.get(key);
        switch prevRating {
          case null {
            skill.ratingCount += 1;
            skill.ratingSum += rating;
          };
          case (?prev) {
            skill.ratingSum := skill.ratingSum - prev + rating;
          };
        };
        ratings.add(key, rating);
        skill.rating := skill.ratingSum.toFloat() / skill.ratingCount.toFloat();
        // Update creator's average rating
        switch (profiles.get(skill.userId)) {
          case null {};
          case (?creator) {
            // Recompute creator rating from all their skills' ratings
            var totalSum = 0;
            var totalCount = 0;
            skills.entries().forEach(func((_, s)) {
              if (Principal.equal(s.userId, skill.userId) and s.ratingCount > 0) {
                totalSum += s.ratingSum;
                totalCount += s.ratingCount;
              };
            });
            if (totalCount > 0) {
              creator.ratingCount := totalCount;
              creator.rating := totalSum.toFloat() / totalCount.toFloat();
            };
          };
        };
        #ok(());
      };
    };
  };

  public func getSkillRating(
    skills : Map.Map<CommonTypes.SkillId, Types.Skill>,
    skillId : CommonTypes.SkillId,
  ) : Float {
    switch (skills.get(skillId)) {
      case null { 0.0 };
      case (?skill) { skill.rating };
    };
  };

  public func toMeta(
    skill : Types.Skill,
    creatorName : Text,
    isUnlocked : Bool,
  ) : Types.SkillWithMeta {
    {
      skillId = skill.skillId;
      userId = skill.userId;
      title = skill.title;
      audioUrl = skill.audioUrl;
      category = skill.category;
      tags = skill.tags;
      rating = skill.rating;
      durationSeconds = skill.durationSeconds;
      createdAt = skill.createdAt;
      isUnlocked;
      creatorName;
    };
  };
};
