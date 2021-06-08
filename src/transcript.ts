export default {
  end: {
    win(name: string) {
      return `You won, ${name}!`;
    },
    lose(name: string) {
      return `You lost, ${name}.`;
    },
  },
};
