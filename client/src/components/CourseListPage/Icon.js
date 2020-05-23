import love from '../../images/bleu-emojis/love.png';
import wow from '../../images/bleu-emojis/wow.png';
import sad from '../../images/bleu-emojis/sad.png';
import angry from '../../images/bleu-emojis/angry.png';
import like from '../../images/bleu-emojis/like.png';
import dislike from '../../images/bleu-emojis/dislike.png';

// const icons = {
//   facebook: {
//     love: "https://static.xx.fbcdn.net/images/emoji.php/v9/z31/2/128/2764.png",
//     wow: "https://static.xx.fbcdn.net/images/emoji.php/v9/z9c/2/128/1f62e.png",
//     sad: "https://static.xx.fbcdn.net/images/emoji.php/v9/ze9/2/128/1f622.png",
//     angry: "https://static.xx.fbcdn.net/images/emoji.php/v9/ze7/2/128/1f620.png",
//     like: "https://static.xx.fbcdn.net/images/emoji.php/v9/zd7/2/128/1f44d.png",
//     dislike: "https://static.xx.fbcdn.net/images/emoji.php/v9/z58/2/128/1f44e.png"
//   }
// }

// BLEU emojis
const icons = {
  facebook: {
    love,
    wow,
    sad,
    angry,
    like,
    dislike
  }
};

export default {
  find: (scope, name) => icons[scope] && icons[scope][name],
};
