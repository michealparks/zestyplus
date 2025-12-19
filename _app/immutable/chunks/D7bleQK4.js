const e=(s,t)=>{const h={h:0,s:0,l:0};return s.getHSL(h),h.h=(h.h+t)%1,h.h<0&&(h.h+=1),s.setHSL(h.h,h.s,h.l),s};export{e as h};
