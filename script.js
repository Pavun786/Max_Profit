let maxtotal = 0;
let maxsol = [];
let buildtime = [4, 5, 10];
let eachProfit = [1000, 1500, 3000];


let maxProfit = (unit,flag) => {
   
    let unitcopy = unit;
    let profit = 0;
    let sol = { "P": 0, "T": 0, "C": 0 };

    while(unitcopy>buildtime[0]){
        if(flag==3){
            if(unitcopy>buildtime[2]){
                unitcopy-=buildtime[2];
                profit+=(eachProfit[2]*unitcopy);
                sol.C+=1;
            }else if(unitcopy>buildtime[1]){
                unitcopy-=buildtime[1];
                profit+=(eachProfit[1]*unitcopy);
                sol.T+=1;
            }else{
                unitcopy-=buildtime[0];
                profit+=(eachProfit[0]*unitcopy);
                sol.P+=1;
            }
        }else if(flag==2){
            if(unitcopy>buildtime[1]){
                unitcopy-=buildtime[1];
                profit+=(eachProfit[1]*unitcopy); 
                sol.T+=1;
            }else{
                unitcopy-=buildtime[0];
                profit+=(eachProfit[0]*unitcopy);
                sol.P+=1;
            }
        }else{
            unitcopy-=buildtime[0];
            profit+=(eachProfit[0]*unitcopy);
            sol.P+=1;
        }
    }
   
    if(maxtotal < profit){
        
        maxsol=[]
        maxtotal=profit;
       
        maxsol.push(sol);
        
        
    } else if(maxtotal == profit){
       
       maxtotal=profit;
       
        maxsol.push(sol);
        
        
    }
    
    sol = {
    "P":0,
    "T":0,
    "C":0
}
}

const calculateMaxProfit = (unit) => {
    maxtotal = 0;
    maxsol = [];

    maxProfit(unit, 3);
    maxProfit(unit, 2);
    maxProfit(unit, 1);


    let lookup = {};
    
    let uniqueArr = maxsol.filter(item => {
    let key = `${item.P}-${item.T}-${item.C}`;
    return lookup[key] ? false : (lookup[key] = true);
});


    return {
        earnings: maxtotal,
        solutions: uniqueArr
    };
};

document.getElementById('profitForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const unit = parseInt(document.getElementById('unitInput').value);
    const result = calculateMaxProfit(unit);

    document.getElementById('earnings').textContent = `Earnings: $ ${result.earnings}`;
    const solutionsContainer = document.getElementById('solutions');
    solutionsContainer.innerHTML = '';

    result.solutions.forEach(sol => {
        const solutionText = `T: ${sol.T}, P: ${sol.P}, C: ${sol.C}`;
        const solutionElement = document.createElement('p');
        solutionElement.textContent = solutionText;
        solutionsContainer.appendChild(solutionElement);
    });

    document.getElementById('output').style.display = 'block';
});
