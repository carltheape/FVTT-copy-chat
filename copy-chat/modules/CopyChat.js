import { warn, error, debug, log } from '../main.js';
import { MODULE_TITLE } from './Settings.js';
export class CopyChat {
  static showDiscordDie = true;
  static init() {
    warn('Init Copy Chat...');
    CopyChat.updateSettings();
  }
  static updateSettings() {
    warn('Update Discord Copy Chat Setting...');
    CopyChat.showDiscordDie = game.settings.get(MODULE_TITLE, 'copy-chat-dice-icons');
  }
  static prepareEvent() {
    warn('Set Clickable Icon...');
    CopyChat.clickable = 'i.fas.fa-copy';

    function copyToClipboard(text) {
      var $temp = $('<input>');
      $('body').append($temp);
      $temp.val(text).select();
      document.execCommand('copy');
      $temp.remove();
    }
    $(document).on('click', CopyChat.clickable, function() {
      CopyChat.updateSettings();
      let diceIcons = ['fa-dice', 'die-one', 'die-two', 'die-three', 'die-four', 'die-five', 'die-six', 'die-d6', 'die-d20'];
      let foundDieIcon = false;
      let content = $(this).closest('.chat-message').text().replace(/\s+/g, ' ');
      let fa_dice = $(this).closest('.chat-message').html();
      for (let dieIcon of diceIcons) {
        if (fa_dice.includes(dieIcon)) {
          foundDieIcon = true;
        }
      }
      if (foundDieIcon && CopyChat.showDiscordDie) {
        fa_dice = ':game_die: ';
      } else {
        fa_dice = '';
      }
      let copyClipboard = fa_dice + content.trim();
      debug(copyClipboard);
      copyToClipboard(copyClipboard);
      ui.notifications.notify('Copied to clipboard');
    }).on('dblclick', (e) => {
      e.preventDefault();
    });
  }
}
