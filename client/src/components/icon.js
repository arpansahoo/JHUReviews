/* eslint max-len: 0 */ // http://dopiaza.org/tools/datauri

const icons = {
    facebook: {
      love: "https://static.xx.fbcdn.net/images/emoji.php/v9/z31/2/128/2764.png",   
      wow: "https://static.xx.fbcdn.net/images/emoji.php/v9/z9c/2/128/1f62e.png",
      sad: "https://static.xx.fbcdn.net/images/emoji.php/v9/ze9/2/128/1f622.png",
      angry: "https://static.xx.fbcdn.net/images/emoji.php/v9/ze7/2/128/1f620.png",
      thumbsUp: "https://static.xx.fbcdn.net/images/emoji.php/v9/zd7/2/128/1f44d.png",
      thumbsDown: "https://static.xx.fbcdn.net/images/emoji.php/v9/z58/2/128/1f44e.png"
    }
  }
  
  export default {
    find: (scope, name) => {
      return icons[scope] && icons[scope][name] 
    },
  }
  