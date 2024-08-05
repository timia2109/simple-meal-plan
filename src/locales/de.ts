export default {
  landing: {
    welcome: "Willkommen beim",
    title: "Simple Meal Plan",
    subtitle: "Plane deine Mahlzeiten für die Woche",
    signinWith: "Anmelden mit {name}",
    author: "von Tim Ittermann",
    privacy: "Impressum / Datenschutz",
    myMealPlans: "Meine Essenspläne",
    logout: "Abmelden",
    profile: "Profile",
  },
  mealPlan: {
    defaultLabel: "Mein Essensplan",
  },
  manageMealPlans: {
    primary: "Standart",
    new: "Neuer Essensplan",
    create: "Erstellen",
    createMealPlan: "Erstelle einen neuen Essensplan",
    renameMealPlan: "Essensplan umbenennen",
    name: "Name des Plans",
    cancel: "Abbrechen",
    delete: "Löschen",
    rename: "Umbenennen",
    disabledDelete: "Du kannst deinen Standart Essensplan nicht löschen",
    manage: "Essenspläne verwalten",
    setAsDefault: "Als Standart festlegen",
    share: "Andere einladen",
    open: "Ansehen",
    leaveTitle: "Essensplan verlassen?",
    leaveMessage:
      "Möchtest du den Essensplan {name} wirklich verlassen? Wenn niemand weiteres in dem Essensplan ist, wird dieser gelöscht.",
  },
  confirmModal: {
    confirm: "Bestätigen",
    cancel: "Abbrechen",
  },
  invite: {
    title: "Andere einladen",
    invite: "Lade andere zu deinem Essensplan {title} ein",
    inviteMessage: "Lade andere ein, um gemeinsam Mahlzeiten zu planen.",
    inviteHint:
      "Sende den folgenden Link an deine Freunde, um diese einzuladen.",
    shareVia: "Teilen über {name}",
    members: "Mitglieder",
    shareText:
      "Hey, möchtest du an meinem Essensplan teilnehmen? Dann klicke auf den folgenden Link: {invitationLink}",
  },
  invitation: {
    expired: "Diese Einladung ist abgelaufen",
    notFound:
      "Diese Einladung wurde nicht gefunden. Aber du kannst trotzdem einen eigenen Essensplan erstellen",
    loginToJoinTitle:
      "{name} hat dich eingeladen, dem Essensplan {mealPlanTitle} beizutreten",
    loginToJoinSubtitle:
      "Melde dich an, um diesem Essensplan beizutreten und gemeinsam Mahlzeiten zu planen",
    unknownUser: "Ein Benutzer",
    header: "Einladung",
    accept: "{mealPlanTitle} beitreten",
  },
  profile: {
    title: "Profil",
    settings: "Einstellungen",
    theme: "Design",
    themeFooter: "Wähle ein Design für die Anwendung. Danke an ",
    calendarLayout: "Kalender Layout",
    calendarLayoutFooter:
      "Verändert den Kalender mit dem Essensplan. Hat nur auf kleinen Geräten eine Auswirkung.",
    calendarLayoutResponsive: "Liste",
    calendarLayoutFixed: "Vollständig",
    deviceSettings:
      "Diese Einstellungen werden als Cookie gespeichert und gelten nur für dieses Gerät.",
  },
} as const;
