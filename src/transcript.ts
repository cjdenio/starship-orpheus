export default {
  end: {
    win(name: string): string {
      return `After finally fueling up the rover, you finally exit the starship and observe the surface of Mars.

The short trip feels like hours, but you finally arrive at the base.

Opening the second airlock door, you're greeted by an overwhelmingly (but a happy kind of overwhelming) excited group of engineers, scientists, and explorers who want to know every detail about your successful recovery.

Every member of your crew is invited to take a slice of space pizza.

It's... terrible.

Welcome to life in space.




*${name}* has been named the official winner of Starship _Orpheus_. Keep your eyes trained on <#C024DGZLHDG> :eyes:`;
    },
    lose(name: string): string {
      return `Despite your best efforts, another team has finished and you fail to complete your mission.

The world mourns your loss, *${name}*.

<#C024DGZLHDG> will have more information shortly.`;
    },
  },
};
