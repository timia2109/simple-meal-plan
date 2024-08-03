export default {
  landing: {
    welcome: "Willkommen beim",
    title: "Simple Meal Plan",
    subtitle: "Plane deine Mahlzeiten für die Woche",
    signinWith: "Anmelden mit {name}",
    author: "Tim Ittermann",
    privacy: "Datenschutz",
    myMealPlans: "Meine Essenspläne",
  },
  mealPlan: {
    defaultLabel: "Mein Essensplan",
  },
  manageMealPlans: {
    primary: "Standart",
    new: "Neuer Essensplan",
    create: "Erstellen",
    delete: "Löschen",
    disabledDelete: "Du kannst deinen Standart Essensplan nicht löschen",
    manage: "Essenspläne verwalten",
    setAsDefault: "Als Standart festlegen",
    share: "Andere einladen",
    open: "Ansehen",
    leaveTitle: "Essensplan verlassen?",
    leaveMessage:
      "Möchtest du den Essensplan wirklich verlassen? Wenn niemand weiteres in dem Essensplan ist, wird dieser gelöscht.",
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
    shareText:
      "Hey, möchtest du an meinem Essensplan teilnehmen? Dann klicke auf den folgenden Link: {invitationLink}",
  },
} as const;
