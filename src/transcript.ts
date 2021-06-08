export default {
  end: {
    win(name: string): string {
      return `You won, ${name}!`;
    },
    lose(name: string): string {
      return `You lost, ${name}.`;
    },
  },
};
