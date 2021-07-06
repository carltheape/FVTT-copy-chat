import { warn, error, debug, log } from '../main.js';
import { MODULE_NAME } from './Settings.js';

export class CopyChat {
  static showDiscordDie = true;
  static init() {
    warn('Init Copy Chat...');
    CopyChat.updateSettings();
  }
  static updateSettings() {
    warn('Update Discord Copy Chat Setting...');
    CopyChat.showDiscordDie = game.settings.get(MODULE_NAME, 'copy-chat-dice-icons');
    warn(CopyChat.showDiscordDie);
  }
  static prepareEvent() {
    warn('Set Clickable Icon...');
    CopyChat.clickable = 'i.fas.fa-copy';
    warn(CopyChat.clickable);

    function copyToClipboard(text) {
      var $temp = $('<input>');
      $('body').append($temp);
      $temp.val(text).select();
      document.execCommand('copy');
      $temp.remove();
    }

    $(document).on('click', CopyChat.clickable, function () {
      warn($(this).closest('chat-message'));
    });

    $(document)
      .on('click', CopyChat.clickable, function () {
        CopyChat.updateSettings();
        let content = $(this).closest('.chat-message').text().replace(/\s+/g, ' ');
        let fa_dice = $(this).closest('.chat-message').html();
        if (fa_dice.includes('fa-dice') && CopyChat.showDiscordDie) {
          fa_dice = ':game_die: ';
        } else {
          fa_dice = '';
        }
        let copyClipboard = fa_dice + content.trim();
        debug(copyClipboard);
        copyToClipboard(copyClipboard);
        ui.notifications.notify('Copied to clipboard');
      })
      .on('dblclick', (e) => {
        e.preventDefault();
      });
  }
}
