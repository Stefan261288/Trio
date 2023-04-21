var freeaps_determineBasal;(()=>{var e={5546:(e,t,a)=>{var r=a(6880);function o(e,t){t||(t=0);var a=Math.pow(10,t);return Math.round(e*a)/a}function n(e,t){return"mmol/L"===t.out_units?o(.0555*e,1):Math.round(e)}e.exports=function(e,t,a,i,s,l,m,u,d,c,g,h,p,f){var v=i.min_bg,B=0,b="",M="",_="",y="",x="",D=0,w=0,S=0,T=0,C=0,U=0;const G=f.weightedAverage;var O=1,R=i.sens,A=i.carb_ratio;f.useOverride&&(R/=O=f.overridePercentage/100,A/=O);const I=i.weightPercentage,j=f.average_total_data;function F(e,t){var a=e.getTime();return new Date(a+36e5*t)}function P(e){var t=i.bolus_increment;.025!=t&&(t=.05);var a=e/t;return a>=1?o(Math.floor(a)*t,5):0}function E(e){function t(e){return e<10&&(e="0"+e),e}return t(e.getHours())+":"+t(e.getMinutes())+":00"}function q(e,t){var a=new Date("1/1/1999 "+e),r=new Date("1/1/1999 "+t);return(a.getTime()-r.getTime())/36e5}function W(e,t){var a=0,r=t,o=(e-t)/36e5,n=0,i=o,s=0;do{if(o>0){var l=E(r),m=p[0].rate;for(let e=0;e<p.length;e++){var u=p[e].start;if(l==u){if(e+1<p.length){o>=(s=q(p[e+1].start,p[e].start))?n=s:o<s&&(n=o)}else if(e+1==p.length){let t=p[0].start;o>=(s=24-q(p[e].start,t))?n=s:o<s&&(n=o)}a+=P((m=p[e].rate)*n),o-=n,console.log("Dynamic ratios log: scheduled insulin added: "+P(m*n)+" U. Bas duration: "+n.toPrecision(3)+" h. Base Rate: "+m+" U/h. Time :"+l),r=F(r,n)}else if(l>u)if(e+1<p.length){var d=p[e+1].start;l<d&&(o>=(s=q(d,l))?n=s:o<s&&(n=o),a+=P((m=p[e].rate)*n),o-=n,console.log("Dynamic ratios log: scheduled insulin added: "+P(m*n)+" U. Bas duration: "+n.toPrecision(3)+" h. Base Rate: "+m+" U/h. Time :"+l),r=F(r,n))}else if(e==p.length-1){o>=(s=q("23:59:59",l))?n=s:o<s&&(n=o),a+=P((m=p[e].rate)*n),o-=n,console.log("Dynamic ratios log: scheduled insulin added: "+P(m*n)+" U. Bas duration: "+n.toPrecision(3)+" h. Base Rate: "+m+" U/h. Time :"+l),r=F(r,n)}}}}while(o>0&&o<i);return a}if(g.length){let e=g.length-1;var k=new Date(g[e].timestamp),L=new Date(g[0].timestamp);if("TempBasalDuration"==g[0]._type&&(L=new Date),(B=(L-k)/36e5)<23.9&&B>21)C=W(k,(z=24-B,N=k.getTime(),new Date(N-36e5*z))),y="24 hours of data is required for an accurate tdd calculation. Currently only "+B.toPrecision(3)+" hours of pump history data are available. Using your pump scheduled basals to fill in the missing hours. Scheduled basals added: "+C.toPrecision(5)+" U. ";else B<21?(ae=!1,enableDynamicCR=!1):y=""}else console.log("Pumphistory is empty!"),ae=!1,enableDynamicCR=!1;var z,N;for(let e=0;e<g.length;e++)"Bolus"==g[e]._type&&(T+=g[e].amount);for(let e=1;e<g.length;e++)if("TempBasal"==g[e]._type&&g[e].rate>0){D=e,U=g[e].rate;var H=g[e-1]["duration (min)"]/60,Z=H,$=new Date(g[e-1].timestamp),J=$,K=0;do{if(e--,0==e){J=new Date;break}if("TempBasal"==g[e]._type||"PumpSuspend"==g[e]._type){J=new Date(g[e].timestamp);break}var Q=e-2;if(Q>=0&&"Rewind"==g[Q]._type){let e=g[Q].timestamp;for(;Q-1>=0&&"Prime"==g[Q-=1]._type;)K=(g[Q].timestamp-e)/36e5;K>=H&&(J=e,K=0)}}while(e>0);var V=(J-$)/36e5;V<Z&&(H=V),S+=P(U*(H-K)),e=D}for(let e=0;e<g.length;e++)if(0,0==g[e]["duration (min)"]||"PumpResume"==g[e]._type){let t=new Date(g[e].timestamp),a=t,r=e;do{if(r>0&&(--r,"TempBasal"==g[r]._type)){a=new Date(g[r].timestamp);break}}while(r>0);(a-t)/36e5>0&&(C+=W(a,t))}for(let e=g.length-1;e>0;e--)if("TempBasalDuration"==g[e]._type){let t=g[e]["duration (min)"]/60,a=new Date(g[e].timestamp);var X=a;let r=e;do{if(--r,r>=0&&("TempBasal"==g[r]._type||"PumpSuspend"==g[r]._type)){X=new Date(g[r].timestamp);break}}while(r>0);if(0==e&&"TempBasalDuration"==g[0]._type&&(X=new Date,t=g[e]["duration (min)"]/60),(X-a)/36e5-t>0){C+=W(X,F(a,t))}}var Y,ee={TDD:o(w=T+S+C,5),bolus:o(T,5),temp_basal:o(S,5),scheduled_basal:o(C,5)};B>21?(M=". Bolus insulin: "+T.toPrecision(5)+" U",_=". Temporary basal insulin: "+S.toPrecision(5)+" U",b=". Insulin with scheduled basal rate: "+C.toPrecision(5)+" U",x=y+(" TDD past 24h is: "+w.toPrecision(5)+" U")+M+_+b,tddReason=", Total insulin: "+o(w,2)+" U, "+o(T/w*100,0)+"% Bolus "+o((S+C)/w*100,0)+"% Basal"):tddReason=", TDD: Not enough pumpData (< 21h)";const te=e.glucose;var ae=h.useNewFormula;const re=h.enableDynamicCR,oe=Math.min(i.autosens_min,i.autosens_max),ne=Math.max(i.autosens_min,i.autosens_max),ie=h.adjustmentFactor,se=i.min_bg;var le=!1,me="",ue=1,de="";j>0&&(ue=G/j),de=ue>1?"Basal adjustment with a 24 hour  to total average (up to 14 days of data) TDD ratio (limited by Autosens max setting). Basal Ratio: "+(ue=o(ue=Math.min(ue,i.autosens_max),2))+". Upper limit = Autosens max ("+i.autosens_max+")":ue<1?"Basal adjustment with a 24 hour to  to total average (up to 14 days of data) TDD ratio (limited by Autosens min setting). Basal Ratio: "+(ue=o(ue=Math.max(ue,i.autosens_min),2))+". Lower limit = Autosens min ("+i.autosens_min+")":"Basal adjusted with a 24 hour to total average (up to 14 days of data) TDD ratio: "+ue,de=", Basal ratio: "+ue,(i.high_temptarget_raises_sensitivity||i.exercise_mode||f.isEnabled)&&(le=!0),se>=118&&le&&(ae=!1,me="Dynamic ISF temporarily off due to a high temp target/exercising. Current min target: "+se);var ce=", Dynamic ratios log: ",ge=", AF: "+ie,he="BG: "+te+" mg/dl ("+(.0555*te).toPrecision(2)+" mmol/l)",pe="",fe="";const ve=h.curve,Be=h.insulinPeakTime,be=h.useCustomPeakTime;var Me=55,_e=65;switch(ve){case"rapid-acting":_e=65;break;case"ultra-rapid":_e=50}be?(Me=120-Be,console.log("Custom insulinpeakTime set to :"+Be+", insulinFactor: "+Me)):(Me=120-_e,console.log("insulinFactor set to : "+Me)),Y=w,I<1&&G>0&&(w=G,console.log("Using weighted TDD average: "+o(w,2)+" U, instead of past 24 h ("+o(Y,2)+" U), weight: "+I),fe=", Weighted TDD: "+o(w,2)+" U");const ye=h.sigmoid;var xe="";if(ae){var De=R*ie*w*Math.log(te/Me+1)/1800;pe=", Logarithmic formula"}if(ae&&ye){const e=oe,t=ne-e,a=.0555*(te-i.min_bg);var we=ue;const r=ne-1,o=Math.log10(1/r-e/r)/Math.log10(Math.E),n=a*ie*we+o;De=t/(1+Math.exp(-n))+e,pe=", Sigmoid function"}var Se=A;const Te=o(A,1);var Ce="",Ue="";if(ae&&w>0){if(Ce=", Dynamic ISF/CR: On/",De>ne?(me=", Dynamic ISF limited by autosens_max setting: "+ne+" ("+o(De,2)+"), ",Ue=", Autosens/Dynamic Limit: "+ne+" ("+o(De,2)+")",De=ne):De<oe&&(me=", Dynamic ISF limjted by autosens_min setting: "+oe+" ("+o(De,2)+"). ",Ue=", Autosens/Dynamic Limit: "+oe+" ("+o(De,2)+")",De=oe),re){Ce+="On";var Ge=De;De>1&&(Ge=(De-1)/2+1);var Oe=" CR: "+(Se=o(Se/Ge,2))+" g/U";A=Se}else Oe=" CR: "+Se+" g/U",Ce+="Off";const e=R/De;xe=". Using Sigmoid function, the autosens ratio has been adjusted with sigmoid factor to: "+o(s.ratio,2)+". New ISF = "+o(e,2)+" mg/dl ("+o(.0555*e,2)+" (mmol/l). CR adjusted from "+o(Te,2)+" to "+o(Se,2)+" ("+o(.0555*A,2)+" mmol/l).",me+=ye?xe:", Dynamic autosens.ratio set to "+o(De,2)+" with ISF: "+e.toPrecision(3)+" mg/dl/U ("+(.0555*e).toPrecision(3)+" mmol/l/U)",s.ratio=De,x+=ce+he+ge+pe+me+Ce+Oe+fe}else x+=ce+"Dynamic Settings disabled";console.log(x),ae||re?ae&&i.tddAdjBasal?tddReason+=Ce+pe+Ue+ge+de:ae&&!i.tddAdjBasal&&(tddReason+=Ce+pe+Ue+ge):tddReason+="";var Re={},Ae=new Date;if(c&&(Ae=c),void 0===i||void 0===i.current_basal)return Re.error="Error: could not get current basal rate",Re;var Ie=r(i.current_basal,i)*O,je=Ie;f.useOverride&&(0==f.duration?console.log("Profile Override is active. Override "+o(100*O,0)+"%. Override Duration: Enabled indefinitely"):console.log("Profile Override is active. Override "+o(100*O,0)+"%. Override Expires in: "+f.duration+" min."));var Fe=new Date;c&&(Fe=c);var Pe,Ee=new Date(e.date),qe=o((Fe-Ee)/60/1e3,1),We=e.glucose,ke=e.noise;Pe=e.delta>-.5?"+"+o(e.delta,0):o(e.delta,0);var Le=Math.min(e.delta,e.short_avgdelta),ze=Math.min(e.short_avgdelta,e.long_avgdelta),Ne=Math.max(e.delta,e.short_avgdelta,e.long_avgdelta);(We<=10||38===We||ke>=3)&&(Re.reason="CGM is calibrating, in ??? state, or noise is high");if(We>60&&0==e.delta&&e.short_avgdelta>-1&&e.short_avgdelta<1&&e.long_avgdelta>-1&&e.long_avgdelta<1&&("fakecgm"==e.device?(console.error("CGM data is unchanged ("+n(We,i)+"+"+n(e.delta,i)+") for 5m w/ "+n(e.short_avgdelta,i)+" mg/dL ~15m change & "+n(e.long_avgdelta,2)+" mg/dL ~45m change"),console.error("Simulator mode detected ("+e.device+"): continuing anyway")):!0),qe>12||qe<-5?Re.reason="If current system time "+Fe+" is correct, then BG data is too old. The last BG data was read "+qe+"m ago at "+Ee:0===e.short_avgdelta&&0===e.long_avgdelta&&(e.last_cal&&e.last_cal<3?Re.reason="CGM was just calibrated":Re.reason="CGM data is unchanged ("+n(We,i)+"+"+n(e.delta,i)+") for 5m w/ "+n(e.short_avgdelta,i)+" mg/dL ~15m change & "+n(e.long_avgdelta,i)+" mg/dL ~45m change"),We<=10||38===We||ke>=3||qe>12||qe<-5||0===e.short_avgdelta&&0===e.long_avgdelta)return t.rate>=je?(Re.reason+=". Canceling high temp basal of "+t.rate,Re.deliverAt=Ae,Re.temp="absolute",Re.duration=0,Re.rate=0,Re):0===t.rate&&t.duration>30?(Re.reason+=". Shortening "+t.duration+"m long zero temp to 30m. ",Re.deliverAt=Ae,Re.temp="absolute",Re.duration=30,Re.rate=0,Re):(Re.reason+=". Temp "+t.rate+" <= current basal "+je+"U/hr; doing nothing. ",Re);var He,Ze,$e,Je,Ke=i.max_iob;if(void 0!==i.min_bg&&(Ze=i.min_bg),void 0!==i.max_bg&&($e=i.max_bg),void 0!==i.enableSMB_high_bg_target&&(Je=i.enableSMB_high_bg_target),void 0===i.min_bg||void 0===i.max_bg)return Re.error="Error: could not determine target_bg. ",Re;He=(i.min_bg+i.max_bg)/2;var Qe=i.exercise_mode||i.high_temptarget_raises_sensitivity||f.isEnabled,Ve=100,Xe=160;if(Xe=i.half_basal_exercise_target,f.isEnabled){const e=f.hbt;console.log("Half Basal Target used: "+n(e,i)+" "+i.out_units),Xe=e}else console.log("Default Half Basal Target used: "+n(Xe,i)+" "+i.out_units);if(Qe&&i.temptargetSet&&He>Ve||i.low_temptarget_lowers_sensitivity&&i.temptargetSet&&He<Ve){var Ye=Xe-Ve;sensitivityRatio=Ye*(Ye+He-Ve)<=0?i.autosens_max:Ye/(Ye+He-Ve),sensitivityRatio=Math.min(sensitivityRatio,i.autosens_max),sensitivityRatio=o(sensitivityRatio,2),process.stderr.write("Sensitivity ratio set to "+sensitivityRatio+" based on temp target of "+He+"; ")}else void 0!==s&&s&&(sensitivityRatio=s.ratio,process.stderr.write("Autosens ratio: "+sensitivityRatio+"; "));if(i.temptargetSet&&He<Ve&&ae&&te>=He&&sensitivityRatio<De&&(s.ratio=De*(Ve/He),s.ratio=Math.min(s.ratio,i.autosens_max),sensitivityRatio=o(s.ratio,2),console.log("Dynamic ratio increased from "+o(De,2)+" to "+o(s.ratio,2)+" due to a low temp target ("+He+").")),sensitivityRatio&&!ae?(je=i.current_basal*O*sensitivityRatio,je=r(je,i)):ae&&i.tddAdjBasal&&(je=i.current_basal*ue*O,je=r(je,i),j>0&&(process.stderr.write("TDD-adjustment of basals activated, using tdd24h_14d_Ratio "+o(ue,2)+", TDD 24h = "+o(Y,2)+"U, Weighted average TDD = "+o(G,2)+"U, (Weight percentage = "+I+"), Total data of TDDs (up to 14 days) average = "+o(j,2)+"U. "),je!==Ie*O?process.stderr.write("Adjusting basal from "+Ie*O+" U/h to "+je+" U/h; "):process.stderr.write("Basal unchanged: "+je+" U/h; "))),i.temptargetSet);else if(void 0!==s&&s&&(i.sensitivity_raises_target&&s.ratio<1||i.resistance_lowers_target&&s.ratio>1)){Ze=o((Ze-60)/s.ratio)+60,$e=o(($e-60)/s.ratio)+60;var et=o((He-60)/s.ratio)+60;He===(et=Math.max(80,et))?process.stderr.write("target_bg unchanged: "+et+"; "):process.stderr.write("target_bg from "+He+" to "+et+"; "),He=et}var tt=200,at=200,rt=200;if(e.noise>=2){var ot=Math.max(1.1,i.noisyCGMTargetMultiplier);Math.min(250,i.maxRaw);tt=o(Math.min(200,Ze*ot)),at=o(Math.min(200,He*ot)),rt=o(Math.min(200,$e*ot)),process.stderr.write("Raising target_bg for noisy / raw CGM data, from "+He+" to "+at+"; "),Ze=tt,He=at,$e=rt}var nt=Ze-.5*(Ze-40),it=i.threshold_setting;it>nt&&it<=120&&it>=65?(console.error("Threshold changed in settings from "+n(nt,i)+" to "+n(it,i)+". "),nt=it):console.error("Current threshold: "+n(nt,i));var st="",lt=(o(R,1),R);if(void 0!==s&&s&&((lt=o(lt=R/sensitivityRatio,1))!==R?process.stderr.write("ISF from "+n(R,i)+" to "+n(lt,i)):process.stderr.write("ISF unchanged: "+n(lt,i)),st+="Autosens ratio: "+o(sensitivityRatio,2)+", ISF: "+n(R,i)+"→"+n(lt,i)),console.error("CR:"+A),void 0===a)return Re.error="Error: iob_data undefined. ",Re;var mt,ut=a;if(a.length,a.length>1&&(a=ut[0]),void 0===a.activity||void 0===a.iob)return Re.error="Error: iob_data missing some property. ",Re;var dt=((mt=void 0!==a.lastTemp?o((new Date(Fe).getTime()-a.lastTemp.date)/6e4):0)+t.duration)%30;if(console.error("currenttemp:"+t.rate+" lastTempAge:"+mt+"m, tempModulus:"+dt+"m"),Re.temp="absolute",Re.deliverAt=Ae,u&&t&&a.lastTemp&&t.rate!==a.lastTemp.rate&&mt>10&&t.duration)return Re.reason="Warning: currenttemp rate "+t.rate+" != lastTemp rate "+a.lastTemp.rate+" from pumphistory; canceling temp",m.setTempBasal(0,0,i,Re,t);if(t&&a.lastTemp&&t.duration>0){var ct=mt-a.lastTemp.duration;if(ct>5&&mt>10)return Re.reason="Warning: currenttemp running but lastTemp from pumphistory ended "+ct+"m ago; canceling temp",m.setTempBasal(0,0,i,Re,t)}var gt=o(-a.activity*lt*5,2),ht=o(6*(Le-gt));ht<0&&(ht=o(6*(ze-gt)))<0&&(ht=o(6*(e.long_avgdelta-gt)));var pt=We,ft=(pt=a.iob>0?o(We-a.iob*lt):o(We-a.iob*Math.min(lt,R)))+ht;if(void 0===ft||isNaN(ft))return Re.error="Error: could not calculate eventualBG. Sensitivity: "+lt+" Deviation: "+ht,Re;var vt=function(e,t,a){return o(a+(e-t)/24,1)}(He,ft,gt);Re={temp:"absolute",bg:We,tick:Pe,eventualBG:ft,insulinReq:0,reservoir:d,deliverAt:Ae,sensitivityRatio,TDD:Y,insulin:ee,current_target:He};var Bt=[],bt=[],Mt=[],_t=[];Bt.push(We),bt.push(We),_t.push(We),Mt.push(We);var yt=function(e,t,a,r,o,i){return t?!e.allowSMB_with_high_temptarget&&e.temptargetSet&&o>100?(console.error("SMB disabled due to high temptarget of "+o),!1):!0===a.bwFound&&!1===e.A52_risk_enable?(console.error("SMB disabled due to Bolus Wizard activity in the last 6 hours."),!1):!0===e.enableSMB_always?(a.bwFound?console.error("Warning: SMB enabled within 6h of using Bolus Wizard: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled due to enableSMB_always"),!0):!0===e.enableSMB_with_COB&&a.mealCOB?(a.bwCarbs?console.error("Warning: SMB enabled with Bolus Wizard carbs: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for COB of "+a.mealCOB),!0):!0===e.enableSMB_after_carbs&&a.carbs?(a.bwCarbs?console.error("Warning: SMB enabled with Bolus Wizard carbs: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for 6h after carb entry"),!0):!0===e.enableSMB_with_temptarget&&e.temptargetSet&&o<100?(a.bwFound?console.error("Warning: SMB enabled within 6h of using Bolus Wizard: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for temptarget of "+n(o,e)),!0):!0===e.enableSMB_high_bg&&null!==i&&r>=i?(console.error("Checking BG to see if High for SMB enablement."),console.error("Current BG",r," | High BG ",i),a.bwFound?console.error("Warning: High BG SMB enabled within 6h of using Bolus Wizard: be sure to easy bolus 30s before using Bolus Wizard"):console.error("High BG detected. Enabling SMB."),!0):(console.error("SMB disabled (no enableSMB preferences active or no condition satisfied)"),!1):(console.error("SMB disabled (!microBolusAllowed)"),!1)}(i,u,l,We,He,Je),xt=i.enableUAM,Dt=0,wt=0;Dt=o(Le-gt,1);var St=o(Le-gt,1);csf=lt/A,console.error("profile.sens:"+n(R,i)+", sens:"+n(lt,i)+", CSF:"+o(csf,1));var Tt=o(30*csf*5/60,1);Dt>Tt&&(console.error("Limiting carb impact from "+Dt+" to "+Tt+"mg/dL/5m (30g/h)"),Dt=Tt);var Ct=3;sensitivityRatio&&(Ct/=sensitivityRatio);var Ut=Ct;if(l.carbs){Ct=Math.max(Ct,l.mealCOB/20);var Gt=o((new Date(Fe).getTime()-l.lastCarbTime)/6e4),Ot=(l.carbs-l.mealCOB)/l.carbs;Ut=o(Ut=Ct+1.5*Gt/60,1),console.error("Last carbs "+Gt+" minutes ago; remainingCATime:"+Ut+"hours; "+o(100*Ot,1)+"% carbs absorbed")}var Rt=Math.max(0,Dt/5*60*Ut/2)/csf,At=90,It=1;i.remainingCarbsCap&&(At=Math.min(90,i.remainingCarbsCap)),i.remainingCarbsFraction&&(It=Math.min(1,i.remainingCarbsFraction));var jt=1-It,Ft=Math.max(0,l.mealCOB-Rt-l.carbs*jt),Pt=(Ft=Math.min(At,Ft))*csf*5/60/(Ut/2),Et=o(l.slopeFromMaxDeviation,2),qt=o(l.slopeFromMinDeviation,2),Wt=Math.min(Et,-qt/3);wt=0===Dt?0:Math.min(60*Ut/5/2,Math.max(0,l.mealCOB*csf/Dt)),console.error("Carb Impact:"+Dt+"mg/dL per 5m; CI Duration:"+o(5*wt/60*2,1)+"hours; remaining CI ("+Ut/2+"h peak):"+o(Pt,1)+"mg/dL per 5m");var kt,Lt,zt,Nt,Ht,Zt=999,$t=999,Jt=999,Kt=We,Qt=999,Vt=999,Xt=999,Yt=999,ea=ft,ta=We,aa=We,ra=0,oa=[],na=[];try{ut.forEach((function(e){var t=o(-e.activity*lt*5,2),a=o(-e.iobWithZeroTemp.activity*lt*5,2),r=pt,n=Dt*(1-Math.min(1,bt.length/12));if(!0===(ae&&!ye))ea=bt[bt.length-1]+o(-e.activity*(1800/(w*ie*Math.log(Math.max(bt[bt.length-1],39)/Me+1)))*5,2)+n,r=_t[_t.length-1]+o(-e.iobWithZeroTemp.activity*(1800/(w*ie*Math.log(Math.max(_t[_t.length-1],39)/Me+1)))*5,2),console.log("Dynamic ISF (Logarithmic Formula) )adjusted predictions for IOB and ZT: IOBpredBG: "+o(ea,2)+" , ZTpredBG: "+o(r,2));else ea=bt[bt.length-1]+t+n,r=_t[_t.length-1]+a;var i=Math.max(0,Math.max(0,Dt)*(1-Bt.length/Math.max(2*wt,1))),s=Math.min(Bt.length,12*Ut-Bt.length),l=Math.max(0,s/(Ut/2*12)*Pt);i+l,oa.push(o(l,0)),na.push(o(i,0)),COBpredBG=Bt[Bt.length-1]+t+Math.min(0,n)+i+l;var m=Math.max(0,St+Mt.length*Wt),u=Math.max(0,St*(1-Mt.length/Math.max(36,1))),d=Math.min(m,u);if(d>0&&(ra=o(5*(Mt.length+1)/60,1)),!0===(ae&&!ye))UAMpredBG=Mt[Mt.length-1]+o(-e.activity*(1800/(w*ie*Math.log(Math.max(Mt[Mt.length-1],39)/Me+1)))*5,2)+Math.min(0,n)+d,console.log("Dynamic ISF (Logarithmic Formula) adjusted prediction for UAM: UAMpredBG: "+o(UAMpredBG,2));else UAMpredBG=Mt[Mt.length-1]+t+Math.min(0,n)+d;bt.length<48&&bt.push(ea),Bt.length<48&&Bt.push(COBpredBG),Mt.length<48&&Mt.push(UAMpredBG),_t.length<48&&_t.push(r),COBpredBG<Qt&&(Qt=o(COBpredBG)),UAMpredBG<Vt&&(Vt=o(UAMpredBG)),ea<Xt&&(Xt=o(ea)),r<Yt&&(Yt=o(r));bt.length>18&&ea<Zt&&(Zt=o(ea)),ea>ta&&(ta=ea),(wt||Pt>0)&&Bt.length>18&&COBpredBG<$t&&($t=o(COBpredBG)),(wt||Pt>0)&&COBpredBG>ta&&(aa=COBpredBG),xt&&Mt.length>12&&UAMpredBG<Jt&&(Jt=o(UAMpredBG)),xt&&UAMpredBG>ta&&UAMpredBG}))}catch(e){console.error("Problem with iobArray.  Optional feature Advanced Meal Assist disabled")}l.mealCOB&&(console.error("predCIs (mg/dL/5m):"+na.join(" ")),console.error("remainingCIs:      "+oa.join(" "))),Re.predBGs={},bt.forEach((function(e,t,a){a[t]=o(Math.min(401,Math.max(39,e)))}));for(var ia=bt.length-1;ia>12&&bt[ia-1]===bt[ia];ia--)bt.pop();for(Re.predBGs.IOB=bt,zt=o(bt[bt.length-1]),_t.forEach((function(e,t,a){a[t]=o(Math.min(401,Math.max(39,e)))})),ia=_t.length-1;ia>6&&!(_t[ia-1]>=_t[ia]||_t[ia]<=He);ia--)_t.pop();if(Re.predBGs.ZT=_t,o(_t[_t.length-1]),l.mealCOB>0&&(Dt>0||Pt>0)){for(Bt.forEach((function(e,t,a){a[t]=o(Math.min(401,Math.max(39,e)))})),ia=Bt.length-1;ia>12&&Bt[ia-1]===Bt[ia];ia--)Bt.pop();Re.predBGs.COB=Bt,Nt=o(Bt[Bt.length-1]),ft=Math.max(ft,o(Bt[Bt.length-1]))}if(Dt>0||Pt>0){if(xt){for(Mt.forEach((function(e,t,a){a[t]=o(Math.min(401,Math.max(39,e)))})),ia=Mt.length-1;ia>12&&Mt[ia-1]===Mt[ia];ia--)Mt.pop();Re.predBGs.UAM=Mt,Ht=o(Mt[Mt.length-1]),Mt[Mt.length-1]&&(ft=Math.max(ft,o(Mt[Mt.length-1])))}Re.eventualBG=ft}console.error("UAM Impact:"+St+"mg/dL per 5m; UAM Duration:"+ra+"hours"),Zt=Math.max(39,Zt),$t=Math.max(39,$t),Jt=Math.max(39,Jt),kt=o(Zt);var sa=l.mealCOB/l.carbs;Lt=o(Jt<999&&$t<999?(1-sa)*UAMpredBG+sa*COBpredBG:$t<999?(ea+COBpredBG)/2:Jt<999?(ea+UAMpredBG)/2:ea),Yt>Lt&&(Lt=Yt),Kt=o(Kt=wt||Pt>0?xt?sa*Qt+(1-sa)*Vt:Qt:xt?Vt:Xt);var la=Jt;if(Yt<nt)la=(Jt+Yt)/2;else if(Yt<He){var ma=(Yt-nt)/(He-nt);la=(Jt+(Jt*ma+Yt*(1-ma)))/2}else Yt>Jt&&(la=(Jt+Yt)/2);if(la=o(la),l.carbs)if(!xt&&$t<999)kt=o(Math.max(Zt,$t));else if($t<999){var ua=sa*$t+(1-sa)*la;kt=o(Math.max(Zt,$t,ua))}else kt=xt?la:Kt;else xt&&(kt=o(Math.max(Zt,la)));kt=Math.min(kt,Lt),process.stderr.write("minPredBG: "+kt+" minIOBPredBG: "+Zt+" minZTGuardBG: "+Yt),$t<999&&process.stderr.write(" minCOBPredBG: "+$t),Jt<999&&process.stderr.write(" minUAMPredBG: "+Jt),console.error(" avgPredBG:"+Lt+" COB/Carbs:"+l.mealCOB+"/"+l.carbs),aa>We&&(kt=Math.min(kt,aa)),Re.COB=l.mealCOB,Re.IOB=a.iob,Re.BGI=n(gt,i),Re.deviation=n(ht,i),Re.ISF=n(lt,i),Re.CR=o(A,1),Re.target_bg=n(He,i),Re.TDD=o(Y,2),Re.current_target=o(He,0);var da=Re.CR;Te!=Re.CR&&(da=Te+"→"+Re.CR);var ca=Re.target_bg;He!=v&&(ca=n(v,i)+"→"+Re.target_bg),Re.reason=st+", COB: "+Re.COB+", Dev: "+Re.deviation+", BGI: "+Re.BGI+", CR: "+da+", Target: "+ca+", minPredBG "+n(kt,i)+", minGuardBG "+n(Kt,i)+", IOBpredBG "+n(zt,i),Nt>0&&(Re.reason+=", COBpredBG "+n(Nt,i)),Ht>0&&(Re.reason+=", UAMpredBG "+n(Ht,i)),Re.reason+=tddReason,Re.reason+="; ";var ga=pt;ga<40&&(ga=Math.min(Kt,ga));var ha,pa=nt-ga,fa=240,va=240;if(l.mealCOB>0&&(Dt>0||Pt>0)){for(ia=0;ia<Bt.length;ia++)if(Bt[ia]<Ze){fa=5*ia;break}for(ia=0;ia<Bt.length;ia++)if(Bt[ia]<nt){va=5*ia;break}}else{for(ia=0;ia<bt.length;ia++)if(bt[ia]<Ze){fa=5*ia;break}for(ia=0;ia<bt.length;ia++)if(bt[ia]<nt){va=5*ia;break}}yt&&Kt<nt&&(console.error("minGuardBG "+n(Kt,i)+" projected below "+n(nt,i)+" - disabling SMB"),yt=!1),void 0===i.maxDelta_bg_threshold&&(ha=.2),void 0!==i.maxDelta_bg_threshold&&(ha=Math.min(i.maxDelta_bg_threshold,.4)),Ne>ha*We&&(console.error("maxDelta "+n(Ne,i)+" > "+100*ha+"% of BG "+n(We,i)+" - disabling SMB"),Re.reason+="maxDelta "+n(Ne,i)+" > "+100*ha+"% of BG "+n(We,i)+" - SMB disabled!, ",yt=!1),console.error("BG projected to remain above "+n(Ze,i)+" for "+fa+"minutes"),(va<240||fa<60)&&console.error("BG projected to remain above "+n(nt,i)+" for "+va+"minutes");var Ba=va,ba=i.current_basal*O*lt*Ba/60,Ma=Math.max(0,l.mealCOB-.25*l.carbs),_a=(pa-ba)/csf-Ma;ba=o(ba),_a=o(_a),console.error("naive_eventualBG:",pt,"bgUndershoot:",pa,"zeroTempDuration:",Ba,"zeroTempEffect:",ba,"carbsReq:",_a),"Could not parse clock data"==l.reason?console.error("carbsReq unknown: Could not parse clock data"):_a>=i.carbsReqThreshold&&va<=45&&(Re.carbsReq=_a,Re.reason+=_a+" add'l carbs req w/in "+va+"m; ");var ya=0;if(We<nt&&a.iob<-i.current_basal*O*20/60&&Le>0&&Le>vt)Re.reason+="IOB "+a.iob+" < "+o(-i.current_basal*O*20/60,2),Re.reason+=" and minDelta "+n(Le,i)+" > expectedDelta "+n(vt,i)+"; ";else if(We<nt||Kt<nt)return Re.reason+="minGuardBG "+n(Kt,i)+"<"+n(nt,i),ya=o(60*((pa=He-Kt)/lt)/i.current_basal*O),ya=30*o(ya/30),ya=Math.min(120,Math.max(30,ya)),m.setTempBasal(0,ya,i,Re,t);if(i.skip_neutral_temps&&Re.deliverAt.getMinutes()>=55)return Re.reason+="; Canceling temp at "+Re.deliverAt.getMinutes()+"m past the hour. ",m.setTempBasal(0,0,i,Re,t);var xa=0,Da=je;if(ft<Ze){if(Re.reason+="Eventual BG "+n(ft,i)+" < "+n(Ze,i),Le>vt&&Le>0&&!_a)return pt<40?(Re.reason+=", naive_eventualBG < 40. ",m.setTempBasal(0,30,i,Re,t)):(e.delta>Le?Re.reason+=", but Delta "+n(Pe,i)+" > expectedDelta "+n(vt,i):Re.reason+=", but Min. Delta "+Le.toFixed(2)+" > Exp. Delta "+n(vt,i),t.duration>15&&r(je,i)===r(t.rate,i)?(Re.reason+=", temp "+t.rate+" ~ req "+je+"U/hr. ",Re):(Re.reason+="; setting current basal of "+je+" as temp. ",m.setTempBasal(je,30,i,Re,t)));xa=o(xa=2*Math.min(0,(ft-He)/lt),2);var wa=Math.min(0,(pt-He)/lt);if(wa=o(wa,2),Le<0&&Le>vt)xa=o(xa*(Le/vt),2);if(Da=r(Da=je+2*xa,i),t.duration*(t.rate-je)/60<Math.min(xa,wa)-.3*je)return Re.reason+=", "+t.duration+"m@"+t.rate.toFixed(2)+" is a lot less than needed. ",m.setTempBasal(Da,30,i,Re,t);if(void 0!==t.rate&&t.duration>5&&Da>=.8*t.rate)return Re.reason+=", temp "+t.rate+" ~< req "+Da+"U/hr. ",Re;if(Da<=0){if((ya=o(60*((pa=He-pt)/lt)/i.current_basal*O))<0?ya=0:(ya=30*o(ya/30),ya=Math.min(120,Math.max(0,ya))),ya>0)return Re.reason+=", setting "+ya+"m zero temp. ",m.setTempBasal(Da,ya,i,Re,t)}else Re.reason+=", setting "+Da+"U/hr. ";return m.setTempBasal(Da,30,i,Re,t)}if(Le<vt&&(!u||!yt))return e.delta<Le?Re.reason+="Eventual BG "+n(ft,i)+" > "+n(Ze,i)+" but Delta "+n(Pe,i)+" < Exp. Delta "+n(vt,i):Re.reason+="Eventual BG "+n(ft,i)+" > "+n(Ze,i)+" but Min. Delta "+Le.toFixed(2)+" < Exp. Delta "+n(vt,i),t.duration>15&&r(je,i)===r(t.rate,i)?(Re.reason+=", temp "+t.rate+" ~ req "+je+"U/hr. ",Re):(Re.reason+="; setting current basal of "+je+" as temp. ",m.setTempBasal(je,30,i,Re,t));if(Math.min(ft,kt)<$e&&(!u||!yt))return Re.reason+=n(ft,i)+"-"+n(kt,i)+" in range: no temp required",t.duration>15&&r(je,i)===r(t.rate,i)?(Re.reason+=", temp "+t.rate+" ~ req "+je+"U/hr. ",Re):(Re.reason+="; setting current basal of "+je+" as temp. ",m.setTempBasal(je,30,i,Re,t));if(ft>=$e&&(Re.reason+="Eventual BG "+n(ft,i)+" >= "+n($e,i)+", "),a.iob>Ke)return Re.reason+="IOB "+o(a.iob,2)+" > max_iob "+Ke,t.duration>15&&r(je,i)===r(t.rate,i)?(Re.reason+=", temp "+t.rate+" ~ req "+je+"U/hr. ",Re):(Re.reason+="; setting current basal of "+je+" as temp. ",m.setTempBasal(je,30,i,Re,t));(xa=o((Math.min(kt,ft)-He)/lt,2))>Ke-a.iob?(console.error("SMB limited by maxIOB: "+Ke-a.iob+" (. insulinReq: "+xa+" U)"),Re.reason+="max_iob "+Ke+", ",xa=Ke-a.iob):console.error("SMB not limited by maxIOB ( insulinReq: "+xa+" U)."),Da=r(Da=je+2*xa,i),xa=o(xa,3),Re.insulinReq=xa;var Sa=o((new Date(Fe).getTime()-a.lastBolusTime)/6e4,1);if(u&&yt&&We>nt){var Ta=o(l.mealCOB/A,3),Ca=0;void 0===i.maxSMBBasalMinutes?(Ca=o(i.current_basal*O*30/60,1),console.error("profile.maxSMBBasalMinutes undefined: defaulting to 30m"),xa>Ca&&console.error("SMB limited by maxBolus: "+Ca+" ( "+xa+" U)")):a.iob>Ta&&a.iob>0?(console.error("IOB"+a.iob+"> COB"+l.mealCOB+"; mealInsulinReq ="+Ta),i.maxUAMSMBBasalMinutes?(console.error("profile.maxUAMSMBBasalMinutes: "+i.maxUAMSMBBasalMinutes+", profile.current_basal: "+i.current_basal*O),Ca=o(i.current_basal*O*i.maxUAMSMBBasalMinutes/60,1)):(console.error("profile.maxUAMSMBBasalMinutes undefined: defaulting to 30m"),Ca=o(i.current_basal*O*30/60,1)),xa>Ca?console.error("SMB limited by maxUAMSMBBasalMinutes [ "+i.maxUAMSMBBasalMinutes+"m ]: "+Ca+"U ( "+xa+"U )"):console.error("SMB is not limited by maxUAMSMBBasalMinutes. ( insulinReq: "+xa+"U )")):(console.error("profile.maxSMBBasalMinutes: "+i.maxSMBBasalMinutes+", profile.current_basal: "+i.current_basal*O),xa>(Ca=o(i.current_basal*i.maxSMBBasalMinutes/60,1))?console.error("SMB limited by maxSMBBasalMinutes: "+i.maxSMBBasalMinutes+"m ]: "+Ca+"U ( insulinReq: "+xa+"U )"):console.error("SMB is not limited by maxSMBBasalMinutes. ( insulinReq: "+xa+"U )"));var Ua=i.bolus_increment,Ga=1/Ua,Oa=i.smb_delivery_ratio;Oa>.5&&console.error("SMB Delivery Ratio increased from default 0.5 to "+o(Oa,2));var Ra=Math.min(xa*Oa,Ca);Ra=Math.floor(Ra*Ga)/Ga,ya=o(60*((He-(pt+Zt)/2)/lt)/i.current_basal*O),xa>0&&Ra<Ua&&(ya=0);var Aa=0;ya<=0?ya=0:ya>=30?(ya=30*o(ya/30),ya=Math.min(60,Math.max(0,ya))):(Aa=o(je*ya/30,2),ya=30),Re.reason+=" insulinReq "+xa,Ra>=Ca&&(Re.reason+="; maxBolus "+Ca),ya>0&&(Re.reason+="; setting "+ya+"m low temp of "+Aa+"U/h"),Re.reason+=". ";var Ia=3;i.SMBInterval&&(Ia=Math.min(10,Math.max(1,i.SMBInterval)));var ja=o(Ia-Sa,0),Fa=o(60*(Ia-Sa),0)%60;if(console.error("naive_eventualBG "+pt+","+ya+"m "+Aa+"U/h temp needed; last bolus "+Sa+"m ago; maxBolus: "+Ca),Sa>Ia?Ra>0&&(Re.units=Ra,Re.reason+="Microbolusing "+Ra+"U. "):Re.reason+="Waiting "+ja+"m "+Fa+"s to microbolus again. ",ya>0)return Re.rate=Aa,Re.duration=ya,Re}var Pa=m.getMaxSafeBasal(i);return Da>Pa&&(Re.reason+="adj. req. rate: "+Da+" to maxSafeBasal: "+o(Pa,2)+", ",Da=r(Pa,i)),t.duration*(t.rate-je)/60>=2*xa?(Re.reason+=t.duration+"m@"+t.rate.toFixed(2)+" > 2 * insulinReq. Setting temp basal of "+Da+"U/hr. ",m.setTempBasal(Da,30,i,Re,t)):void 0===t.duration||0===t.duration?(Re.reason+="no temp, setting "+Da+"U/hr. ",m.setTempBasal(Da,30,i,Re,t)):t.duration>5&&r(Da,i)<=r(t.rate,i)?(Re.reason+="temp "+t.rate+" >~ req "+Da+"U/hr. ",Re):(Re.reason+="temp "+t.rate+"<"+Da+"U/hr. ",m.setTempBasal(Da,30,i,Re,t))}},6880:(e,t,a)=>{var r=a(6654);e.exports=function(e,t){var a=20;void 0!==t&&"string"==typeof t.model&&(r(t.model,"54")||r(t.model,"23"))&&(a=40);return e<1?Math.round(e*a)/a:e<10?Math.round(20*e)/20:Math.round(10*e)/10}},2705:(e,t,a)=>{var r=a(5639).Symbol;e.exports=r},9932:e=>{e.exports=function(e,t){for(var a=-1,r=null==e?0:e.length,o=Array(r);++a<r;)o[a]=t(e[a],a,e);return o}},9750:e=>{e.exports=function(e,t,a){return e==e&&(void 0!==a&&(e=e<=a?e:a),void 0!==t&&(e=e>=t?e:t)),e}},4239:(e,t,a)=>{var r=a(2705),o=a(9607),n=a(2333),i=r?r.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":i&&i in Object(e)?o(e):n(e)}},531:(e,t,a)=>{var r=a(2705),o=a(9932),n=a(1469),i=a(3448),s=r?r.prototype:void 0,l=s?s.toString:void 0;e.exports=function e(t){if("string"==typeof t)return t;if(n(t))return o(t,e)+"";if(i(t))return l?l.call(t):"";var a=t+"";return"0"==a&&1/t==-Infinity?"-0":a}},7561:(e,t,a)=>{var r=a(7990),o=/^\s+/;e.exports=function(e){return e?e.slice(0,r(e)+1).replace(o,""):e}},1957:(e,t,a)=>{var r="object"==typeof a.g&&a.g&&a.g.Object===Object&&a.g;e.exports=r},9607:(e,t,a)=>{var r=a(2705),o=Object.prototype,n=o.hasOwnProperty,i=o.toString,s=r?r.toStringTag:void 0;e.exports=function(e){var t=n.call(e,s),a=e[s];try{e[s]=void 0;var r=!0}catch(e){}var o=i.call(e);return r&&(t?e[s]=a:delete e[s]),o}},2333:e=>{var t=Object.prototype.toString;e.exports=function(e){return t.call(e)}},5639:(e,t,a)=>{var r=a(1957),o="object"==typeof self&&self&&self.Object===Object&&self,n=r||o||Function("return this")();e.exports=n},7990:e=>{var t=/\s/;e.exports=function(e){for(var a=e.length;a--&&t.test(e.charAt(a)););return a}},6654:(e,t,a)=>{var r=a(9750),o=a(531),n=a(554),i=a(9833);e.exports=function(e,t,a){e=i(e),t=o(t);var s=e.length,l=a=void 0===a?s:r(n(a),0,s);return(a-=t.length)>=0&&e.slice(a,l)==t}},1469:e=>{var t=Array.isArray;e.exports=t},3218:e=>{e.exports=function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}},7005:e=>{e.exports=function(e){return null!=e&&"object"==typeof e}},3448:(e,t,a)=>{var r=a(4239),o=a(7005);e.exports=function(e){return"symbol"==typeof e||o(e)&&"[object Symbol]"==r(e)}},8601:(e,t,a)=>{var r=a(4841),o=1/0;e.exports=function(e){return e?(e=r(e))===o||e===-1/0?17976931348623157e292*(e<0?-1:1):e==e?e:0:0===e?e:0}},554:(e,t,a)=>{var r=a(8601);e.exports=function(e){var t=r(e),a=t%1;return t==t?a?t-a:t:0}},4841:(e,t,a)=>{var r=a(7561),o=a(3218),n=a(3448),i=/^[-+]0x[0-9a-f]+$/i,s=/^0b[01]+$/i,l=/^0o[0-7]+$/i,m=parseInt;e.exports=function(e){if("number"==typeof e)return e;if(n(e))return NaN;if(o(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=o(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=r(e);var a=s.test(e);return a||l.test(e)?m(e.slice(2),a?2:8):i.test(e)?NaN:+e}},9833:(e,t,a)=>{var r=a(531);e.exports=function(e){return null==e?"":r(e)}}},t={};function a(r){var o=t[r];if(void 0!==o)return o.exports;var n=t[r]={exports:{}};return e[r](n,n.exports,a),n.exports}a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}();var r=a(5546);freeaps_determineBasal=r})();
