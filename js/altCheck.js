(function () {
  const logo = document.querySelectorAll('object');
  const images = document.querySelectorAll('img');
  const altCss = {
    'default': 'width :auto; display: inline-block; position:absolute; font-size:12px; background:#23f313;color:black;font-weight:bold;padding:5px;z-index:99999;',
    'warning': 'width :auto; display: inline-block; position:absolute; font-size:12px; background:red;color:white;font-weight:bold;padding:5px;z-index:99999;'
  };

  // ALT取得、組み立て
  function displayAlt(array) {

    for (let i = 0; i < array.length; i++) {
      if (
        array[i].closest('.news_parse_list') ||
        array[i].classList.contains('ajax_src_onload') ||
        array[i].closest('#google_translate_element')
      ) { // 除外パーツ
        continue;
      }

      // 組み立て
      let altText = document.createElement('span');
      altText.textContent = array[i].getAttribute('alt') ? array[i].getAttribute('alt') : 'ALTなし';
      if (altText.textContent === 'ALTなし' || altText.textContent === 'ALTが入ります') {
        array[i].parentNode.insertBefore(altText, array[i]).setAttribute('style', altCss['warning']);
      } else {
        array[i].parentNode.insertBefore(altText, array[i]).setAttribute('style', altCss['default']);
      }

      if (array[i].closest('.ofi')) { // ofi用調整
        altText.style.transform = 'translateY(-100%)';
      }

      if (array[i].closest('.main_visual')) { // main_visual調整用
        let offset = 110 * i + '%';
        altText.style.transform = 'translateY(' + offset + ')';
      }

      if (array[i].classList.contains('sp-only') || array[i].classList.contains('sp-only02') || array[i].classList.contains('sp-only03')) { // SP画像にはラベル追加
        altText.style.background = 'aqua';
        altText.textContent += '(SP)';
      }
    }
  }

  // ロゴをチェック
  if (logo) {
    displayAlt(logo);
  }

  // 各画像をチェック
  displayAlt(images);
})();