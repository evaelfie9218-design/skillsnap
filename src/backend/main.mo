import Map "mo:core/Map";
import Set "mo:core/Set";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import CommonTypes "types/common";
import UserTypes "types/user";
import SkillTypes "types/skill";
import UserApiMixin "mixins/user-api";
import SkillApiMixin "mixins/skill-api";
import CreditsApiMixin "mixins/credits-api";
import LeaderboardApiMixin "mixins/leaderboard-api";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinObjectStorage();

  let profiles = Map.empty<CommonTypes.UserId, UserTypes.UserProfile>();
  let skills = Map.empty<CommonTypes.SkillId, SkillTypes.Skill>();
  let unlocks = Map.empty<CommonTypes.UserId, Set.Set<CommonTypes.SkillId>>();
  let ratings = Map.empty<Text, Nat>(); // key: "userId:skillId"
  include UserApiMixin(accessControlState, profiles);
  include SkillApiMixin(accessControlState, skills, profiles, unlocks, ratings);
  include CreditsApiMixin(accessControlState, skills, profiles, unlocks);
  include LeaderboardApiMixin(profiles);
};
