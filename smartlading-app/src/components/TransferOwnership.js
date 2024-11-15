import React, { useState } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({
    billOfLadingNumber: '',
    shipDate: '',
    shipFrom: '',
    shipTo: '',
    carrierName: '',
    freightChargesTerm: '',
    thirdPartyFreightCharges: '',
    specialInstructions: '',
    cargo: '',
    status: 'default',
    owner: 'admin',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.shipDate) newErrors.shipDate = "Ship Date is required";
    if (!formData.billOfLadingNumber || !/^\d+$/.test(formData.billOfLadingNumber)) {
      newErrors.billOfLadingNumber = "Bill of Lading Number must be a valid number";
    }
    if (!formData.shipFrom) newErrors.shipFrom = "Ship From is required";
    if (!formData.shipTo) newErrors.shipTo = "Ship To is required";
    if (!formData.carrierName) newErrors.carrierName = "Carrier Name is required";
    if (!formData.cargo) newErrors.cargo = "Cargo is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      // Here you would typically send the data to your backend
    } else {
      console.log("Form has errors");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Register a Bill of Lading</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Bill of Lading Number</label>
          <input
            type="text"
            name="billOfLadingNumber"
            value={formData.billOfLadingNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.billOfLadingNumber && <p className="text-red-500 text-sm">{errors.billOfLadingNumber}</p>}
        </div>

        <div>
          <label className="block mb-1">Ship Date</label>
          <input
            type="date"
            name="shipDate"
            value={formData.shipDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.shipDate && <p className="text-red-500 text-sm">{errors.shipDate}</p>}
        </div>

        <div>
          <label className="block mb-1">Ship From</label>
          <input
            type="text"
            name="shipFrom"
            value={formData.shipFrom}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.shipFrom && <p className="text-red-500 text-sm">{errors.shipFrom}</p>}
        </div>

        <div>
          <label className="block mb-1">Ship To</label>
          <input
            type="text"
            name="shipTo"
            value={formData.shipTo}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.shipTo && <p className="text-red-500 text-sm">{errors.shipTo}</p>}
        </div>

        <div>
          <label className="block mb-1">Carrier Name</label>
          <input
            type="text"
            name="carrierName"
            value={formData.carrierName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.carrierName && <p className="text-red-500 text-sm">{errors.carrierName}</p>}
        </div>

        <div>
          <label className="block mb-1">Freight Charges Term</label>
          <input
            name="freightChargesTerm"
            value={formData.freightChargesTerm}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Third Party Freight Charges Bill To</label>
          <input
            name="thirdPartyFreightCharges"
            value={formData.thirdPartyFreightCharges}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Special Instructions</label>
          <input
            name="specialInstructions"
            value={formData.specialInstructions}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Cargo</label>
          <input
            type="text"
            name="cargo"
            value={formData.cargo}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.cargo && <p className="text-red-500 text-sm">{errors.cargo}</p>}
        </div>

        <div>
          <label className="block mb-1">Owner</label>
          <input
            type="text"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.owner && <p className="text-red-500 text-sm">{errors.owner}</p>}
        </div>

        <div>
          <label className="block mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="default">1- Default</option>
            <option value="Draft">2- Draft</option>
            <option value="Issued">3- Issued </option>
            <option value="Active">4- Active </option>
            <option value="InTransit">5- InTransit </option>
            <option value="Transferred">6- Transferred </option>
            <option value="Amended">7- Amended </option>
            <option value="Surrendered">8- Surrendered </option>
            <option value="Switched">9- Switched </option>
            <option value="Released">10- Released </option>
            <option value="Accomplished">11- Accomplished </option>
            <option value="Cancelled">12- Cancelled </option>
            <option value="Expired">13- Expired </option>
            <option value="Disputed">14- Disputed </option>
            <option value="Archived">15- Archived </option>
          </select>
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
}