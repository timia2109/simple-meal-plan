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
    admin: "Admin",
  },
  features: {
    featureA: "Einfache Essensplanung",
    featureADescription: "Plane super einfach den Essensplan",
    featureAImgAlt: "Bild mit einem Screenshot der Anwendung",

    featureB: "Immer und überall",
    featureBDescription1:
      "Diese Webseite funktioniert auf dem Computer und dem Handy.",
    featureBDescription2: "Somit hast du deinen Essensplan immer dabei!",
    featureBImgAlt: "Bild von einem Handy und einem Computer",

    featureC: "Gemeinsam planen",
    featureCDescription:
      "Lade deine Mitbewohner oder Freunde ein und plane gemeinsam",
    featureCImgAlt: "Bild von Menschen die gemeinsam essen",

    featureD: "Kostenlos & Werbefrei",
    featureDDescription:
      "Diese Anwendung ist kostenfrei und Werbefrei, weil niemand mag Werbung.",

    featureE: "Open-Source",
    featureEDescription:
      "Der Quellcode ist auf GitHub verfügbar. Jeder kann mithelfen diese Anwendung zu verbessern.",
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
  admin: {
    title: "Admin",
    kpis: "Statistiken",
    invitations: "Einladungen",
    mealPlans: "Essenspläne",
    mealEntries: "Mahlzeiten",
    mealEntriesThisMonth: "Mahlzeiten diesen Monat",
    mealEntriesToday: "Mahlzeiten heute",
    users: "Nutzer",
    generalKpis: "Generelle Statistiken",
    mealPlanKpis: "Essensplan Statistiken",
    newUsersThisMonth: "Neue Nutzer diesen Monat",
    newUsersToday: "Neue Nutzer heute",
    usersKpis: "Nutzer Statistiken",
    userEmail: "E-Mail",
    userCreatedAt: "Erstellt am",
    usersQuery: "Suche nach Name oder E-Mail",
    usersSearch: "Suchen",
  },
} as const;
