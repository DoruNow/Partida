import Vue from "vue";
import Component from "vue-class-component";
import { Card } from "@/mixins/DeckMixin";

@Component
export default class PlayingCardMapper extends Vue {
  playingCardMapper(card: Card): string {
    if (!card) {
      return "";
    }
    let value, type;

    switch (card.type) {
      case "Diamonds":
        type = "_of_diamonds";
        break;
      case "Clubs":
        type = "_of_clubs";
        break;
      case "Spades":
        type = "_of_spades";
        break;
      case "Hearts":
        type = "_of_hearts";
        break;
    }

    switch (card.value) {
      case 14:
        value = "ace";
        break;
      case 11:
        value = "jack";
        break;
      case 12:
        value = "queen";
        break;
      case 13:
        value = "king";
        break;
      default:
        console.log(value);
        value = card.value.toString();
    }

    return require("../assets/SVG-cards-1.3/" + value + type + ".svg");
  }
}
