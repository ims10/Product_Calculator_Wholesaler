(function(){
  const $ = id => document.getElementById(id);
  const sellPriceEl = $('sellPrice');
  const revenueEl = $('revenue');
  const buyCostEl = $('buyCost');
  const profitEl = $('profit');
  const profitPctEl = $('profitPct');
  const resultCard = $('resultCard');

  function format(n){ return '₹' + Number(n).toLocaleString('en-IN', {minimumFractionDigits:2, maximumFractionDigits:2}) }

  function calculate(){
    const buy = parseFloat($('buyPrice').value || 0);
    const mrp = parseFloat($('mrpPrice').value || 0);
    const discount = parseFloat($('discount').value || 0);
    const sold = parseInt($('sold').value || 0, 10);
    const freeB = parseInt($('free').value || 0, 10);

    if (isNaN(buy) || isNaN(mrp) || isNaN(discount) || isNaN(sold) || isNaN(freeB)) {
      alert('कृपया सर्व फील्ड योग्य प्रकारे भरा');
      return;
    }

    const sellPrice = mrp * (1 - discount/100);
    const totalBottles = sold + freeB;
    const totalCost = totalBottles * buy;
    const totalRevenue = sold * sellPrice;
    const profit = totalRevenue - totalCost;
    const profitPct = totalCost > 0 ? (profit / totalCost * 100) : 0;

    sellPriceEl.textContent = format(sellPrice);
    revenueEl.textContent = format(totalRevenue);
    buyCostEl.textContent = format(totalCost);
    profitEl.textContent = format(profit);
    profitPctEl.textContent = profitPct.toFixed(2) + '%';

    resultCard.classList.remove('hidden');
    // color cue for profit/loss
    if (profit >= 0) {
      profitEl.style.color = '#1b5e20';
    } else {
      profitEl.style.color = '#b71c1c';
    }
  }

  $('calcBtn').addEventListener('click', calculate);
  $('resetBtn').addEventListener('click', function(){
    document.getElementById('calcForm').reset();
    resultCard.classList.add('hidden');
  });

  // calculate once on load with default values
  calculate();
})();
