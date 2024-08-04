export default {
  landing: {
    welcome: "Welcome to the",
    title: "Simple Meal Plan",
    subtitle: "Plan your meals for the week",
    signinWith: "Sign in with {name}",
    author: "Tim Ittermann",
    privacy: "Privacy",
    myMealPlans: "My Meal Plans",
  },
  mealPlan: {
    defaultLabel: "My Meal Plan",
  },
  manageMealPlans: {
    primary: "Default",
    new: "New Meal Plan",
    create: "Create",
    createMealPlan: "Create a new meal plan",
    renameMealPlan: "Rename Meal Plan",
    name: "Name of the Plan",
    cancel: "Cancel",
    delete: "Delete",
    rename: "Rename",
    disabledDelete: "You can't delete your default meal plan",
    manage: "Manage Meal Plans",
    setAsDefault: "Set as default",
    share: "Invite others",
    open: "View",
    leaveTitle: "Leave Meal Plan?",
    leaveMessage:
      "Do you really want to leave the meal plan {name}? If there are no other participants, it will be deleted.",
  },
  confirmModal: {
    confirm: "Confirm",
    cancel: "Cancel",
  },
  invite: {
    title: "Invite others",
    invite: "Invite to your Meal Plan: {title}",
    inviteMessage:
      "Invite others to join your meal plan and plan meals together.",
    inviteHint: "Send the following link to invite others.",
    shareVia: "Share via {name}",
    shareText:
      "Hey, do you want to join my meal plan? Then click on the following link: {invitationLink}",
  },
  invitation: {
    expired: "This invitation has expired",
    notFound:
      "This invitation was not found. But you can still create your own meal plan",
    loginToJoinTitle:
      "{name} invited you to join the meal plan {mealPlanTitle}",
    loginToJoinSubtitle:
      "Sign in to join this meal plan and plan meals together",
    unknownUser: "A user",
    header: "Invitation",
    accept: "Join {mealPlanTitle}",
  },
} as const;
