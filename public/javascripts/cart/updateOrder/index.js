export function updateOrder(type,price){
    const summary = document.querySelector('.summary-card');

    const totalSum = summary.querySelector('.summary-value');

    const tax = summary.querySelector('.tax-cost');

    const allValue = summary.querySelector('.total-value');

    if(type === 'pluse'){

        let updateSum = Number(totalSum.textContent.split('$').pop()) + price;
    
        totalSum.textContent = '$' + updateSum;

        tax.textContent = '$' + Math.ceil(updateSum * 0.08);

        allValue.textContent = '$' + (updateSum + Math.ceil(updateSum * 0.08));
    }else{
        let updateSum = Number(totalSum.textContent.split('$').pop()) - price;

        totalSum.textContent = '$' + updateSum;

        tax.textContent = '$' + Math.ceil(updateSum * 0.08);

        allValue.textContent = '$' + (updateSum + Math.ceil(updateSum * 0.08));
    }
}