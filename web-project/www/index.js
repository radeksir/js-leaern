import naja from 'naja';
import './index.less';

document.addEventListener('DOMContentLoaded', naja.initialize.bind(naja));

// Z dokumentace NAJA
// udalost navěšená po kliku
naja.snippetHandler.addEventListener('beforeUpdate', (event) => {
    // if (event.snippet.id === 'snippet--alert') {
        window.alert(event.content);
    // }

    window.alert(event.content);
});

