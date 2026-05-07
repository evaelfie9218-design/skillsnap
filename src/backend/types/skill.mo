import CommonTypes "common";

module {
  public type SkillId = CommonTypes.SkillId;
  public type UserId = CommonTypes.UserId;

  public type Skill = {
    skillId : SkillId;
    userId : UserId;
    title : Text;
    audioUrl : Text;
    category : Text;
    tags : [Text];
    var rating : Float;
    var ratingCount : Nat;
    var ratingSum : Nat;
    durationSeconds : Nat;
    createdAt : CommonTypes.Timestamp;
  };

  // Shared version for API boundary
  public type SkillPublic = {
    skillId : SkillId;
    userId : UserId;
    title : Text;
    audioUrl : Text;
    category : Text;
    tags : [Text];
    rating : Float;
    durationSeconds : Nat;
    createdAt : CommonTypes.Timestamp;
  };

  public type SkillWithMeta = {
    skillId : SkillId;
    userId : UserId;
    title : Text;
    audioUrl : Text;
    category : Text;
    tags : [Text];
    rating : Float;
    durationSeconds : Nat;
    createdAt : CommonTypes.Timestamp;
    isUnlocked : Bool;
    creatorName : Text;
  };

  public type SkillFilter = {
    category : ?Text;
    tag : ?Text;
    search : ?Text;
  };
};
