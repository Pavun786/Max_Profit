document.getElementById("calculate").addEventListener("click", function () {
    const timeUnits = parseInt(document.getElementById("time-units").value, 10);
    const solutions = [];
    const buildtime = [4, 5, 10];
    const eachProfit = [1000, 1500, 3000];
  
    const findSolutions = (flag) => {
      let unitcopy = timeUnits;
      let profit = 0;
      let sol = { P: 0, T: 0, C: 0 };
  
      while (unitcopy >= Math.min(...buildtime)) {
        if (flag === 3) {
          if (unitcopy >= buildtime[2]) {
            unitcopy -= buildtime[2];
            profit += eachProfit[2] * unitcopy;
            sol.C += 1;
          } else if (unitcopy >= buildtime[1]) {
            unitcopy -= buildtime[1];
            profit += eachProfit[1] * unitcopy;
            sol.T += 1;
          } else if (unitcopy >= buildtime[0]) {
            unitcopy -= buildtime[0];
            profit += eachProfit[0] * unitcopy;
            sol.P += 1;
          }
        } else if (flag === 2) {
          if (unitcopy >= buildtime[1]) {
            unitcopy -= buildtime[1];
            profit += eachProfit[1] * unitcopy;
            sol.T += 1;
          } else if (unitcopy >= buildtime[0]) {
            unitcopy -= buildtime[0];
            profit += eachProfit[0] * unitcopy;
            sol.P += 1;
          }
        } else {
          if (unitcopy >= buildtime[0]) {
            unitcopy -= buildtime[0];
            profit += eachProfit[0] * unitcopy;
            sol.P += 1;
          }
        }
      }
  
      solutions.push({ ...sol, profit });
    };
  
    
    findSolutions(3);
    findSolutions(2);
    findSolutions(1);
  
   
    const lookup = {};
    const uniqueSolutions = solutions.filter((item) => {
      const key = `${item.P}-${item.T}-${item.C}`;
      return lookup[key] ? false : (lookup[key] = true);
    });
  
   
    uniqueSolutions.sort((a, b) => a.profit - b.profit);
  
    
    const maxProfit = Math.max(...uniqueSolutions.map((s) => s.profit));
  
    
    const tableBody = document.getElementById("solutions-table");
    tableBody.innerHTML = ""; 
  
    uniqueSolutions.forEach((s) => {
      const row = document.createElement("tr");
      if (s.profit === maxProfit) {
        row.classList.add("highlight");
      }
      row.innerHTML = `
        <td>${s.profit}</td>
        <td>${s.P}</td>
        <td>${s.T}</td>
        <td>${s.C}</td>
      `;
      tableBody.appendChild(row);
    });
  });
  
