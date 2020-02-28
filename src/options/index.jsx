import React from 'react';

import { compose, withState } from 'recompose';

export default function Options() {
  return (
    <div>
      <h1>Options</h1>

      <GainLoss />
    </div>
  );
}

function renderCents(cents) {
  if (cents >= 0) {
    return '$' + (cents / 100).toFixed(2);
  } else {
    return '-$' + Math.abs(cents / 100).toFixed(2);
  }
}

function GainLossBase({ optionPrice, setOptionPrice, stockPrice, setStockPrice, strikePrice, setStrikePrice, amount, setAmount, side, setSide, type, setType }) {
  let breakdown = null;
  if (parseFloat(optionPrice) && parseFloat(stockPrice) && parseFloat(strikePrice) && parseInt(amount)) {
    const priceCents = Math.floor(parseFloat(optionPrice) * 100);
    const stockPriceCents = Math.floor(parseFloat(stockPrice) * 100);
    const strikePriceCents = Math.floor(parseFloat(strikePrice) * 100);
    const contracts = parseInt(amount) * 100;

    if (side === 'buy') {
      const premium = priceCents * contracts;

      let typeMultiplier = 1;
      let maxGain = 'unbounded';
      if (type === 'put') {
        typeMultiplier = -1;
        maxGain = renderCents((strikePriceCents - 1) * contracts - premium);
      }
      const breakEvenCents = strikePriceCents + typeMultiplier * priceCents;
      const gainLoss = -1 * premium + Math.max(0, typeMultiplier * contracts * (stockPriceCents - strikePriceCents));

      breakdown = (
        <div>
          <div><b>Gain/Loss</b> = {renderCents(gainLoss)}</div>
          <div><b>Premium</b> = {renderCents(premium)}</div>
          <div><b>Max gain</b> = {maxGain}</div>
          <div><b>Max loss</b> = {renderCents(premium)}</div>
          <div><b>Break-even price</b> = {renderCents(breakEvenCents)}</div>
        </div>
      );
    } else if (side === 'sell') {
      const credit = priceCents * contracts;

      let typeMultiplier = 1;
      let maxLoss = 'unbounded';
      if (type === 'put') {
        typeMultiplier = -1;
        maxLoss = renderCents(credit - (strikePriceCents - 1) * contracts);
      }
      const breakEvenCents = strikePriceCents + typeMultiplier * priceCents;
      const gainLoss = credit + Math.min(0, typeMultiplier * contracts * (strikePriceCents - stockPriceCents));

      breakdown = (
        <div>
          <div><b>Gain/Loss</b> = {renderCents(gainLoss)}</div>
          <div><b>Credit</b> = {renderCents(credit)}</div>
          <div><b>Max gain</b> = {renderCents(credit)}</div>
          <div><b>Max loss</b> = {maxLoss}</div>
          <div><b>Break-even price</b> = {renderCents(breakEvenCents)}</div>
        </div>
      );
    }
  }

  return (
    <section>
       <h2>Gain and Loss</h2>
       <div>
         <div>
           <label>Side</label>
           <select value={side} onChange={e => setSide(e.target.value)}>
             <option value="buy">Buy</option>
             <option value="sell">Sell</option>
           </select>
         </div>
         <div>
           <label>Type</label>
           <select value={type} onChange={e => setType(e.target.value)}>
             <option value="call">Call</option>
             <option value="put">Put</option>
           </select>
         </div>
         <div>
           <label>Strike price</label>
           <input type="text" value={strikePrice} onChange={e => setStrikePrice(e.target.value)} />
         </div>
         <div>
           <label>Price of option at purchase</label>
           <input type="text" value={optionPrice} onChange={e => setOptionPrice(e.target.value)} />
         </div>
         <div>
           <label>Contracts x 100</label>
           <input type="text" value={amount} onChange={e => setAmount(e.target.value)} />
         </div>
         <div>
           <label>Price of stock at expiration</label>
           <input type="text" value={stockPrice} onChange={e => setStockPrice(e.target.value)} />
         </div>
       </div>
       {breakdown}
    </section>
  );
}

const GainLoss = compose(
  withState('optionPrice', 'setOptionPrice', ''),
  withState('stockPrice', 'setStockPrice', ''),
  withState('strikePrice', 'setStrikePrice', ''),
  withState('amount', 'setAmount', ''),
  withState('side', 'setSide', 'buy'),
  withState('type', 'setType', 'call')
)(GainLossBase);
