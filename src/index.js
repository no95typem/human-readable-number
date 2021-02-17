module.exports = function toReadable (x) {
    let hrnString = "";
  if(x<0) { 
    hrnString+="minus ";
    x=-x; 
  }
  if(x==0) {
    hrnString+='zero';
    return hrnString;
  }
  let dec = [];
  while(x>=1) {
    dec.push(x%10);
    x-=x%10;
    x=x/10;
  }
   
  //parse millions
  if(dec.length>6) {
    hrnString+=parseCurrentThreeDecades(dec, 7);
    hrnString+=' million ';
  }

  //parse thousands
  if(dec.length>3) {
    hrnString+=parseCurrentThreeDecades(dec, 4);
    hrnString+=' thousand ';
  }

  //parse 1-999
  if(dec.length>0) {
    hrnString+=parseCurrentThreeDecades(dec, 1);
  }

  hrnString = hrnString.replace(/  +/g, ' ');
  if(hrnString[0]==' ') hrnString = hrnString.slice(1,hrnString.length);
  if(hrnString[hrnString.length-1]==' ') hrnString = hrnString.slice(0,hrnString.length-1);
  return hrnString;

}

function parseCurrentThreeDecades(dec, realDecNumber) {
  let jsDecNumber = realDecNumber - 1;
  let js3DecNumber = jsDecNumber+2;
  let js2DecNumber = jsDecNumber+1;
  if(dec.length > js3DecNumber) return parse100(dec[js3DecNumber]*100+dec[js2DecNumber]*10+dec[jsDecNumber]);   // there is hundred
  if(dec.length > js2DecNumber) return parse100(dec[js2DecNumber]*10+dec[jsDecNumber]); // there is 2 decades only
  if(dec.length > jsDecNumber) return parse100(dec[jsDecNumber]); // there is 1 decade only
  return null;
}

function parse100(x) {
  if(x < 10) return parse9(x);
  switch(x) {
    case 10: return ' ten ';
    case 11: return ' eleven ';
    case 12: return ' twelve ';
    case 13: return ' thirteen ';
    case 14: return ' fourteen ';
    case 15: return ' fifteen ';
    case 16: return ' sixteen ';
    case 17: return ' seventeen ';
    case 18: return ' eighteen ';
    case 19: return ' nineteen ';
    default: break;
  }
  if(x < 30) return ' twenty ' + parse9(x%10);
  if(x < 40) return ' thirty ' + parse9(x%10);
  if(x < 50) return ' forty ' + parse9(x%10);
  if(x < 60) return ' fifty ' + parse9(x%10);
  if(x < 70) return ' sixty ' + parse9(x%10);
  if(x < 80) return ' seventy ' + parse9(x%10);
  if(x < 90) return ' eighty ' + parse9(x%10);
  if(x < 100) return ' ninety ' + parse9(x%10);
  return parse9((x-x%100)/100) + 'hundred'  + parse100(x%100);
}

function parse9(x) {
  switch(x) {
    case 1: return ' one ';
    case 2: return ' two ';
    case 3: return ' three ';
    case 4: return ' four ';
    case 5: return ' five ';
    case 6: return ' six ';
    case 7: return ' seven ';
    case 8: return ' eight ';
    case 9: return ' nine ';
    default: return '';
  }
}
