import Map "mo:core/Map";
import Principal "mo:core/Principal";
import UserLib "../lib/user";
import UserTypes "../types/user";
import CommonTypes "../types/common";

mixin (
  profiles : Map.Map<CommonTypes.UserId, UserTypes.UserProfile>,
) {
  public query func getLeaderboard(sortBy : UserTypes.LeaderboardSort, limit : Nat) : async [UserTypes.LeaderboardEntry] {
    UserLib.getLeaderboard(profiles, sortBy, limit);
  };
};
