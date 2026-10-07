(function(){
  const data={
    ops:{brief:[["Salary","$58k–$66k"],["Setup","On-site"],["Start","4 weeks"]],funnel:"148 sourced, 9 interviewed, <strong>3 shortlisted</strong>",
      people:[["AM","Candidate A","Six years coordinating freight and inventory for a regional distributor.",["Interviewed","References checked","2 weeks notice"]],
              ["JT","Candidate B","Four years in operations at a manufacturing plant. Bilingual English and French.",["Interviewed","References checked"]],
              ["RK","Candidate C","Five years in supply chain planning. Available immediately.",["Interviewed","Skills assessed"]]]},
    it:{brief:[["Salary","$55k–$65k"],["Setup","Hybrid"],["Start","2 weeks"]],funnel:"212 sourced, 11 interviewed, <strong>4 shortlisted</strong>",
      people:[["DO","Candidate A","CompTIA A+ certified. Three years on a help desk supporting 400 users.",["Interviewed","Tech test passed"]],
              ["LS","Candidate B","Two years of Microsoft 365 and Active Directory administration.",["Interviewed","References checked"]],
              ["PN","Candidate C","Field technician moving into in-house support. Strong with hardware.",["Interviewed","Tech test passed"]]]},
    site:{brief:[["Salary","$85k–$95k"],["Setup","On-site"],["Start","6 weeks"]],funnel:"96 sourced, 7 interviewed, <strong>3 shortlisted</strong>",
      people:[["BW","Candidate A","Red Seal carpenter with eight years leading residential crews.",["Interviewed","Safety tickets verified"]],
              ["EF","Candidate B","Ran commercial fit-outs up to $4M. Familiar with Procore.",["Interviewed","References checked"]],
              ["KA","Candidate C","Six years as a foreman on multi-family builds.",["Interviewed","Safety tickets verified"]]]}
  };
  const brief=document.getElementById('brief'),list=document.getElementById('list'),funnel=document.getElementById('funnel');
  const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  function show(k,anim){
    const d=data[k];
    brief.innerHTML=d.brief.map(([a,b])=>`<div><span>${a}</span><strong>${esc(b)}</strong></div>`).join('');
    list.innerHTML=d.people.map(([i,n,t,c])=>`<li><span class="av">${i}</span><div><h3>${n}</h3><p>${esc(t)}</p><div class="checks">${c.map(x=>`<span>${x}</span>`).join('')}</div></div></li>`).join('');
    funnel.innerHTML=d.funnel;
    if(anim){list.classList.remove('swap');void list.offsetWidth;list.classList.add('swap');}
  }
  const tabs=document.querySelectorAll('.roles button');
  tabs.forEach(t=>t.addEventListener('click',()=>{tabs.forEach(x=>x.setAttribute('aria-selected',x===t));show(t.dataset.r,true);}));
  show('ops',false);

  const fb=document.querySelectorAll('.seg button');
  fb.forEach(b=>b.addEventListener('click',()=>{
    fb.forEach(x=>x.setAttribute('aria-pressed',x===b));
    document.querySelectorAll('#jobs-list .job').forEach(j=>j.hidden=!(b.dataset.f==='all'||j.dataset.t===b.dataset.f));
  }));

  const form=document.getElementById('form'),topic=document.getElementById('topic'),orgL=document.getElementById('org-l'),st=document.getElementById('status');
  const opts={e:['Permanent placement','Contract and temp staff','Executive search','Volume hiring'],c:['Finding a permanent job','Contract or temp work','Resume and interview help']};
  const setWho=w=>{topic.innerHTML=opts[w].map(o=>`<option>${o}</option>`).join('');orgL.textContent=w==='e'?'Company':'Job title you want';};
  setWho('e');
  form.addEventListener('change',e=>{if(e.target.name==='who')setWho(e.target.value)});
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const n=form.querySelector('#name').value.trim(),m=form.querySelector('#email').value.trim();
    st.hidden=false;
    if(!n||!/^\S+@\S+\.\S+$/.test(m)){st.textContent='Add your name and a valid email address to send this message.';return;}
    const endpoint=form.dataset.endpoint;
    if(!endpoint){st.textContent='Thanks, '+n.split(' ')[0]+'. This form is not connected to an inbox yet. Please email us directly for now.';return;}
    const btn=document.getElementById('send');btn.disabled=true;st.textContent='Sending…';
    const fd=new FormData(form);
    fd.append('type',form.querySelector('input[name="who"]:checked').value==='e'?'Employer':'Job seeker');
    fetch(endpoint,{method:'POST',body:fd,headers:{Accept:'application/json'}})
      .then(r=>{if(!r.ok)throw 0;form.reset();setWho('e');st.textContent='Message sent. We will reply within one business day.';})
      .catch(()=>{st.textContent='Your message did not send. Check your connection and try again, or email us directly.';})
      .finally(()=>{btn.disabled=false;});
  });
})();
