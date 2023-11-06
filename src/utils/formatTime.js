export const formattedTime = (timeString) => {
  if(timeString){
    const [hours, minutes] = timeString?.split(':');
    let period = 'AM';

    let hours12 = parseInt(hours);
    if (hours12 >= 12) {
      period = 'PM';
      if (hours12 > 12) {
        hours12 -= 12;
      }
    }

    return `${hours12}:${minutes} ${period}`;

  }
    
   

}