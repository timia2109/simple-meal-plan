export default {
  landing: {
    welcome: "Welcome to the",
    title: "Simple Meal Plan",
    subtitle: "Plan your meals for the week",
    signinWith: "Sign in with {name}",
    author: "from Tim Ittermann",
    privacy: "Imprint / Privacy",
    myMealPlans: "My Meal Plans",
    logout: "Logout",
    profile: "Profile",
    admin: "Admin",
  },
  features: {
    featureA: "Simple Meal Planning",
    featureADescription: "Plan your meal plan super easily",
    featureAImgAlt: "Image with a screenshot of the application",

    featureB: "Always and everywhere",
    featureBDescription1: "This website works on the computer and the phone.",
    featureBDescription2: "So you always have your meal plan with you!",
    featureBImgAlt: "Image of a phone and a computer",

    featureC: "Plan together",
    featureCDescription: "Invite your roommates or friends and plan together",
    featureCImgAlt: "Image of people eating together",

    featureD: "Free & Ad-Free",
    featureDDescription:
      "This application is free and ad-free, because no one likes ads.",

    featureE: "Open-Source",
    featureEDescription:
      "The source code is available on GitHub. Everyone can help to improve this application",
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
    members: "Members",
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
  profile: {
    title: "Profile",
    settings: "Settings",
    theme: "Theme",
    themeFooter: "Select your preferred theme. Thanks to ",
    calendarLayout: "Calendar Layout",
    calendarLayoutFooter:
      "Changes the calendar with the Meal Plan. Only affects small devices.",
    calendarLayoutResponsive: "List",
    calendarLayoutFixed: "Full",
    deviceSettings:
      "This settings are saved as cookies and only affecting the current device.",
  },
  admin: {
    title: "Admin",
    kpis: "KPIs",
    invitations: "Invitations",
    mealEntries: "Meal Entries",
    mealPlans: "Meal Plans",
    mealEntriesThisMonth: "Meal Entries this month",
    mealEntriesToday: "Meal Entries today",
    users: "Users",
    mealPlanKpis: "Meal Plan KPIs",
    generalKpis: "General KPIs",
    newUsersThisMonth: "New Users this month",
    newUsersToday: "New Users today",
    usersKpis: "Users KPIs",
    userEmail: "Email",
    userCreatedAt: "Created at",
    usersQuery: "Search for name or email",
    usersSearch: "Search",
  },
} as const;
