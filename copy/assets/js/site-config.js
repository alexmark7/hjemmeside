/*
 * Binderly — central site configuration.
 * Update product details, release information, and feature status here.
 */
window.SITE_CONFIG = {
  productName: "Binderly",
  tagline: "Your Pokémon collection, all in one place.",
  version: "0.1.0",
  releaseStatus: "unpublished",
  downloadUrl: null,
  supportedOS: "To be confirmed for the first release",
  repositoryUrl: "https://github.com/alexmark7/hjemmeside",
  repositoryLabel: "Project website repository",
  contactEndpoint: null,
  featureStatus: {
    collection: "core",
    catalogue: "core",
    cardDetails: "core",
    editing: "core",
    search: "core",
    sorting: "core",
    filtering: "core",
    localSave: "core",
    importExport: "should",
    localImages: "should",
    manualCards: "should",
    statistics: "could",
    catalogueImport: "could",
    merge: "could"
  },
  statusLabels: {
    core: { text: "In the app", className: "status--live" },
    should: { text: "Planned", className: "status--planned" },
    could: { text: "Planned", className: "status--planned" }
  }
};
