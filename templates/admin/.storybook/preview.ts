import type { Preview } from "@storybook/react";

// Import the global styles of the app
import '../assets/scss/app.scss'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  // decorators: [
  //   (Story) => {
  //     // Ajouter ici un décorateur générique si besoin
  //     return (
  //       <Story />
  //     )
  //   }
  // ],
};

export default preview;
