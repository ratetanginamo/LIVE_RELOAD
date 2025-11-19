// animation_lr.js
const fs = require('fs');
const path = require('path');

module.exports = {
  init: ()=>console.log('[AnimationLR] initialized'),
  onFileChange: function(projectPath, filename) {
    // create small temp script to trigger animation on next reload
    try {
      const tmp = path.join(projectPath, 'animation_temp.js');
      const content = `(function(){const el=document.querySelector('body');if(el){el.style.transition='transform 0.35s ease';el.style.transform='scale(1.02)';setTimeout(()=>el.style.transform='scale(1)',350);}})();`;
      fs.writeFileSync(tmp, content, 'utf8');
      setTimeout(()=>{ try{ if(fs.existsSync(tmp)) fs.unlinkSync(tmp); }catch(e){} }, 1500);
    } catch(e) {
      console.error('[AnimationLR] error', e.message);
    }
  }
};
