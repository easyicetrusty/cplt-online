(function(){
  const $=s=>document.querySelector(s);
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait=ms=>new Promise(r=>setTimeout(r,reduce?0:ms));
  const L=$('#lhs'), R=$('#rhs'), LV=$('#lv'), RV=$('#rv'), btn=$('#run'), meter=$('#meter');
  let ran=false;

  const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
  // mark glyph-garbage tokens so the eye can see what a char-counter cannot
  const mark=s=>esc(s).replace(/[一-鿿]|&lt;math&gt;[^&]*?&lt;\/math&gt;|&lt;su[bp]&gt;.&lt;\/su[bp]&gt;/g,
                              m=>'<span class="g">'+m+'</span>');

  async function typeInto(node, lines, fmt){
    node.innerHTML='';
    for(const line of lines){
      const d=document.createElement('div');
      d.innerHTML=fmt(line)||'&nbsp;';
      node.appendChild(d);
      await wait(70);
    }
  }
  function verdict(node, cls, mark_, text){
    node.className='verdict '+cls;
    node.innerHTML='<span class="mark">'+mark_+'</span><span>'+text+'</span>';
  }

  async function run(){
    if(ran) return; ran=true; btn.disabled=true; btn.textContent='Running…';
    LV.className='verdict'; LV.innerHTML='<span class="meter blink">counting characters…</span>';
    RV.className='verdict'; RV.innerHTML='<span class="meter blink">classifying page…</span>';

    // left: text-OCR runs first, produces plenty of characters
    await typeInto(L, GARBLE, mark);
    const chars = GARBLE.join('').replace(/\s/g,'').length;
    meter.innerHTML='text-OCR returned <b>'+chars+'</b> characters · text layer had <b>'+Math.round(chars*0.71)+'</b> · recall ratio <b>'+(chars/(chars*0.71)).toFixed(2)+'</b>';
    await wait(500);
    verdict(LV,'v-pass','✓','VALIDATION PASSED — recall ratio above threshold. Shipped as evidence.');

    // right: page classified first, routed to vision, checked for garble
    await wait(400);
    RV.innerHTML='<span class="meter blink">embedded raster &gt;300×200 detected → routing to vision @400 DPI…</span>';
    await wait(900);
    await typeInto(R, CLEAN, s=>esc(s)
      .replace(/\*\*(.+?)\*\*/g,'<b>$1</b>')
      .replace(/(\[VISION-EXTRACTED DIAGRAM\])/,'<span class="q">$1</span>')
      .replace(/(NOT STATED)/,'<span class="q">$1</span>'));
    await wait(300);
    verdict(RV,'v-hold','▲','GARBLE CHECK CLEAN — transcription accepted. One evidence gap recorded for a human.');
    btn.textContent='Run again'; btn.disabled=false; ran=false;
  }
  btn.addEventListener('click', run);
})();
