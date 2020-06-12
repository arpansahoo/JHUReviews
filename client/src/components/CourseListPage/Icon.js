import love from "../../images/bleu-emojis/love.png";
import wow from "../../images/bleu-emojis/wow.png";
import sad from "../../images/bleu-emojis/sad.png";
import angry from "../../images/bleu-emojis/angry.png";
import like from "../../images/bleu-emojis/like.png";
import dislike from "../../images/bleu-emojis/dislike.png";

const icons = {
  facebook: {
    love,
    wow,
    sad,
    angry,
    like,
    dislike,
  },
};

export default {
  find: (scope, name) => icons[scope] && icons[scope][name],
};
