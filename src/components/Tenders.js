import React from 'react';
import '../components/styles/Tenders.css'; // Ensure this CSS file is created and styled

const Tenders = () => {
  return (
    <div className="tenders-page">
      {/* Introduction Section */}
      <div className="tenders-intro">
        <h1>PREQUALIFICATION/REGISTRATION OF SUPPLIERS FOR SUPPLY AND DELIVERY OF GOODS, WORKS AND SERVICES</h1>
        <p>
          Eigoll Enterprises invites applications for registration of suppliers, service providers, and contractors for the financial year 2024 – 2027.
        </p>
        <p>
          Interested suppliers are invited to apply for prequalification, indicating the category of the goods, works, and services they wish to supply/provide.
        </p>
        <p>
          The completed pre-qualification documents are to be addressed to:
        </p>
        <p className='address'>
          Finance Director <br />
          Eigoll Enterprises <br />
          P.O BOX 43903- 00100 Nairobi, Kenya.
        </p>
        <p>
          Any queries regarding pre-qualification must be sent in writing to <a href="mailto:procurement@eigoll.com">procurement@eigoll.com</a>.
        </p>
        <p>
          Completed pre-qualification documents should be submitted electronically as PDF documents clearly indicating the PREQ NO. and DESCRIPTION of the item being applied for, through email <a href="mailto:tenders@eigoll.com">tenders@eigoll.com</a> not later than 5:00pm, 30th August 2024.
        </p>

        {/* Buttons Section */}
        <div className="tenders-buttons">
          <button className="apply-button">APPLY HERE</button>
          <button className="tier-button">TENDER PRE-QUALIFICATION TIER 1 - GENERAL SUPPLIERS</button>
          <button className="tier-button">TENDER PRE-QUALIFICATION TIER 2 - AGRIBUSINESS SMEs</button>
        </div>
      </div>

      {/* Table Section */}
      <div className="tenders-table">
        <h2>Category A – Supply of Goods</h2>
        <table>
          <thead>
            <tr>
              <th>S. NO.</th>
              <th>TENDER NO.</th>
              <th>TENDER DESCRIPTION</th>
              <th>NON-REFUNDABLE TENDER FEE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>EIG/PREQ/01/2024-2027</td>
              <td>SUPPLY & DELIVERY OF GENERAL OFFICE EQUIPMENT, STATIONERY, AND OTHER CONSUMABLES.</td>
              <td>KSH 2,000</td>
            </tr>
            <tr>
              <td>2</td>
              <td>EIG/PREQ/02/2024-2027</td>
              <td>SUPPLY & DELIVERY OF COMPUTERS, PRINTERS, UPS, LAPTOPS, AND ACCESSORIES.</td>
              <td>KSH 2,000</td>
            </tr>
            <tr>
              <td>3</td>
              <td>EIG/PREQ/03/2024-2027</td>
              <td>SUPPLY, DELIVERY AND INSTALLATION OF COMPUTER SOFTWARES, LICENSE CONSUMABLES, WEBSITES DESIGN & ICT MATERIALS.</td>
              <td>KSH 2,000</td>
            </tr>
            <tr>
              <td>4</td>
              <td>EIG/PREQ/04/2024-2027</td>
              <td>SUPPLY AND DELIVERY OF OFFICE FURNITURE AND FITTINGS.</td>
              <td>KSH 2,000</td>
            </tr>
            <tr>
              <td>5</td>
              <td>EIG/PREQ/05/2024-2027</td>
              <td>SUPPLY & PRINTING OF PROMOTIONAL & BRANDED MATERIALS.</td>
              <td>KSH 2,000</td>
            </tr>
            <tr>
              <td>6</td>
              <td>EIG/PREQ/06/2024-2027</td>
              <td>SUPPLY AND DELIVERY OF BRANDED STAFF UNIFORMS.</td>
              <td>KSH 2,000</td>
            </tr>
            <tr>
              <td>7</td>
              <td>EIG/PREQ/07/2024-2027</td>
              <td>SUPPLY AND DELIVERY OF PERSONAL PROTECTIVE EQUIPMENT.</td>
              <td>KSH 2,000</td>
            </tr>
            <tr>
              <td>8</td>
              <td>EIG/PREQ/08/2024-2027</td>
              <td>SUPPLY AND DELIVERY OF PACKAGING MATERIALS EG PVC SLEEVES, CORRUGATED CARTONS, WRAPPERS, TAPES, PRINTED TAPES, SELF ADHESIVE LABELS.</td>
              <td>KSH 3,000</td>
            </tr>
            <tr>
              <td>9</td>
              <td>EIG/PREQ/09/2024-2027</td>
              <td>SUPPLY AND DELIVERY OF PACKAGING AND WRAPPING MATERIAL FOR GIFT HAMPERS.</td>
              <td>KSH 3,000</td>
            </tr>
            <tr>
              <td>10</td>
              <td>EIG/PREQ/10/2024-2027</td>
              <td>SUPPLY & DELIVERY OF HAIR SALON EQUIPMENTS AND ACCESSORIES.</td>
              <td>KSH 5,000</td>
            </tr>
            <tr>
              <td>11</td>
              <td>EIG/PREQ/11/2024-2027</td>
              <td>SUPPLY & DELIVERY OF ELECTRICAL AND HAND PALLET JACKS.</td>
              <td>KSH 5,000</td>
            </tr>
            <tr>
              <td>12</td>
              <td>EIG/PREQ/12/2024-2027</td>
              <td>SUPPLY & DELIVERY OF BLOW/INJECTION MOLDING MACHINES AND SPARES.</td>
              <td>KSH 5,000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tenders;
