import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import UserLib "../lib/user";
import UserTypes "../types/user";
import CommonTypes "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  profiles : Map.Map<CommonTypes.UserId, UserTypes.UserProfile>,
) {
  public shared ({ caller }) func getMyProfile() : async ?UserTypes.UserProfilePublic {
    let profile = UserLib.ensureProfile(profiles, caller, caller.toText());
    ?UserLib.toPublic(profile);
  };

  public shared ({ caller }) func saveMyProfile(name : Text, languages : [Text]) : async () {
    let profile = UserLib.ensureProfile(profiles, caller, name);
    let updated : UserTypes.UserProfile = {
      userId = profile.userId;
      name;
      var credits = profile.credits;
      var rating = profile.rating;
      var ratingCount = profile.ratingCount;
      languages;
      var creditsEarned = profile.creditsEarned;
      var skillCount = profile.skillCount;
      createdAt = profile.createdAt;
    };
    profiles.add(caller, updated);
  };

  public query ({ caller }) func getMyCredits() : async Nat {
    UserLib.getCredits(profiles, caller);
  };

  // Required by authorization extension
  public query ({ caller }) func getCallerUserProfile() : async ?UserTypes.UserProfilePublic {
    UserLib.getProfile(profiles, caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(name : Text) : async () {
    let profile = UserLib.ensureProfile(profiles, caller, name);
    let updated : UserTypes.UserProfile = {
      userId = profile.userId;
      name;
      var credits = profile.credits;
      var rating = profile.rating;
      var ratingCount = profile.ratingCount;
      languages = profile.languages;
      var creditsEarned = profile.creditsEarned;
      var skillCount = profile.skillCount;
      createdAt = profile.createdAt;
    };
    profiles.add(caller, updated);
  };

  public query func getUserProfile(userId : CommonTypes.UserId) : async ?UserTypes.UserProfilePublic {
    UserLib.getProfile(profiles, userId);
  };
};
