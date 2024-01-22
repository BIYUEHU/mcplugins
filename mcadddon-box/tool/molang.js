const math = {
    abs: function (value) {
          if (value < 0) {
             var value = -value;
          } else if (value >= 0) {
                   
          } else {
             var value = "error";    
          }
       return value;
    }
}

alert(math.abs(1))
//alert(Math.abs(-1))
//alert(math_abs(11+464-443-34-46464616661*44))
