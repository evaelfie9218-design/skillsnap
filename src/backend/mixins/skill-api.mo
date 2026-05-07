import Map "mo:core/Map";
import Set "mo:core/Set";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import SkillLib "../lib/skill";
import UserLib "../lib/user";
import SkillTypes "../types/skill";
import UserTypes "../types/user";
import CommonTypes "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  skills : Map.Map<CommonTypes.SkillId, SkillTypes.Skill>,
  profiles : Map.Map<CommonTypes.UserId, UserTypes.UserProfile>,
  unlocks : Map.Map<CommonTypes.UserId, Set.Set<CommonTypes.SkillId>>,
  ratings : Map.Map<Text, Nat>,
) {
  var nextSkillId : Nat = 0;
  public shared ({ caller }) func createSkill(
    title : Text,
    audioUrl : Text,
    category : Text,
    tags : [Text],
  ) : async CommonTypes.Result<CommonTypes.SkillId, Text> {
    if (caller.isAnonymous()) {
      return #err("Must be authenticated");
    };
    ignore UserLib.ensureProfile(profiles, caller, caller.toText());
    let result = SkillLib.createSkill(skills, profiles, nextSkillId, caller, title, audioUrl, category, tags);
    switch result {
      case (#ok(_)) { nextSkillId += 1 };
      case (#err(_)) {};
    };
    result;
  };

  public query ({ caller }) func listSkills(filter : SkillTypes.SkillFilter) : async [SkillTypes.SkillWithMeta] {
    SkillLib.listSkills(skills, profiles, unlocks, filter, caller);
  };

  public query ({ caller }) func getSkill(skillId : CommonTypes.SkillId) : async ?SkillTypes.SkillWithMeta {
    SkillLib.getSkill(skills, profiles, unlocks, skillId, caller);
  };

  public query ({ caller }) func getMySkills() : async [SkillTypes.SkillWithMeta] {
    SkillLib.getMySkills(skills, profiles, unlocks, caller);
  };

  public shared ({ caller }) func rateSkill(skillId : CommonTypes.SkillId, rating : Nat) : async CommonTypes.Result<(), Text> {
    if (caller.isAnonymous()) {
      return #err("Must be authenticated");
    };
    SkillLib.rateSkill(skills, profiles, unlocks, ratings, caller, skillId, rating);
  };

  public query func getSkillRating(skillId : CommonTypes.SkillId) : async Float {
    SkillLib.getSkillRating(skills, skillId);
  };
};
