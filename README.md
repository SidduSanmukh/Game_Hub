# Game_Hub

Game_Hub is a web application that serves as a hub for various mini-games. It provides a centralized platform for users to discover, play, and enjoy a collection of interactive games.

## Features

- **Multiple Games**: Play a variety of classic and engaging mini-games.
- **Responsive Design**: Enjoy a seamless experience across different devices, including desktops and mobile phones.
- **User Profiles**: Manage your player name, email, and track your achievements and game statistics.
- **Dynamic Content**: Easily add or remove games from the platform.

## Games Included

- **Tic Tac Toe**: A classic two-player game.
- **Snake Game**: Navigate a snake to eat food and grow, avoiding obstacles.
- **Memory Match**: Test your memory by matching pairs of cards.
- **Bike Race**: A simple racing game.
- **Alphabet Game**: An educational game focused on letter recognition.
- **Math Challenge**: A game to test and improve mathematical skills.
- **Word Builder**: A game for building words.

## Technologies Used

- **React**: Frontend JavaScript library for building user interfaces.
- **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Vite**: A fast build tool that provides a lightning-fast development experience.
- **Shadcn/ui**: Reusable components built with Radix UI and Tailwind CSS.

## Getting Started

Follow these instructions to set up and run the project locally on your machine.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [Yarn](https://yarnpkg.com/) or [Bun](https://bun.sh/)

### Installation

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/gameverse-arena-unite.git
    cd gameverse-arena-unite
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or yarn install
    # or bun install
    ```

### Running the Application

To start the development server, run:

```bash
npm run dev
# or yarn dev
# or bun dev
```

The application will be accessible at `http://localhost:8080/` (or another port if 8080 is in use).

## Project Structure

```
.qodo/
public/
src/
├── App.css
├── App.tsx
├── components/
│   ├── GameCard.tsx
│   ├── Header.tsx
│   ├── LeaderboardSection.tsx
│   ├── Login.tsx
│   ├── Profile.tsx
│   ├── StatsSection.tsx
│   ├── TestimonialsSection.tsx
│   ├── games/
│   └── ui/
├── hooks/
│   ├── use-mobile.tsx
│   ├── use-toast.ts
│   └── useTopPlayerToasts.ts
├── index.css
├── lib/
│   └── utils.ts
├── main.tsx
├── pages/
│   ├── Index.tsx
│   └── NotFound.tsx
└── vite-env.d.ts
```

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License.
