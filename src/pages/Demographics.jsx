import React, { useState, useEffect } from "react";
import DonutChart from "../components/DonutChart";
import { useNavigate } from "react-router-dom";

function Demographics() {
  const [activeSection, setActiveSection] = useState('race');
  const [demographicData, setDemographicData] = useState({
    race: '',
    age: '',
    gender: '',
    confidence: 0,
    probabilities: {
      race: [],
      age: [],
      gender: []
    }
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem('analysisData');
    if (storedData) {
      const { data } = JSON.parse(storedData);
      if (data) {
        // Get highest probability for each category
        const getMaxProbability = (obj) => 
          Object.entries(obj).reduce((max, curr) => curr[1] > max[1] ? curr : max);

        const [race, raceConfidence] = getMaxProbability(data.race);
        const [age] = getMaxProbability(data.age);
        const gender = data.gender.male > data.gender.female ? 'male' : 'female';

        // Sort probabilities for each category
        const raceProbabilities = Object.entries(data.race)
          .map(([race, probability]) => ({
            label: race.replace(/_/g, ' '),
            probability: Math.round(probability * 100)
          }))
          .sort((a, b) => b.probability - a.probability);

        const ageProbabilities = Object.entries(data.age)
          .map(([age, probability]) => ({
            label: age,
            probability: Math.round(probability * 100)
          }))
          .sort((a, b) => b.probability - a.probability);

        const genderProbabilities = Object.entries(data.gender)
          .map(([gender, probability]) => ({
            label: gender,
            probability: Math.round(probability * 100)
          }))
          .sort((a, b) => b.probability - a.probability);

        setDemographicData({
          race: race.replace(/_/g, ' '),
          age,
          gender,
          confidence: Math.round(raceConfidence * 100),
          probabilities: {
            race: raceProbabilities,
            age: ageProbabilities,
            gender: genderProbabilities
          }
        });
      }
    }
  }, []);

  const getActiveProbabilities = () => {
    return demographicData.probabilities[activeSection] || [];
  };

  const getActiveConfidence = () => {
    const activeProbs = getActiveProbabilities();
    const activeValue = demographicData[activeSection];
    const selectedItem = activeProbs.find(item => item.label.toLowerCase() === activeValue.toLowerCase());
    return selectedItem ? selectedItem.probability : 0;
  };

  return (
    <div className="summary-container">
      <div className="summary-heading">
        <h1 className="summary-subtitle-one">A.I. Analysis</h1>
        <h1 className="summary-title">Demographics</h1>
        <p className="summary-subtitle-two">Predicted race & age</p>
      </div>
      <div className="demographics-container">
        <div className="small-rectangles">
          <div 
            className={`first-small-rectangle ${activeSection === 'race' ? 'active' : ''}`}
            onClick={() => setActiveSection('race')}
            style={{
              cursor: 'pointer'
            }}
          >
            <h1 className="small-rectangle-heading">{demographicData.race}</h1>
            <h1 className="small-rectangle-heading">Race</h1>
          </div>
          <div 
            className={`second-small-rectangle ${activeSection === 'age' ? 'active' : ''}`}
            onClick={() => setActiveSection('age')}
            style={{
              cursor: 'pointer'
            }}
          >
            <h1 className="small-rectangle-heading">{demographicData.age}</h1>
            <h1 className="small-rectangle-heading">Age</h1>
          </div>
          <div 
            className={`third-small-rectangle ${activeSection === 'gender' ? 'active' : ''}`}
            onClick={() => setActiveSection('gender')}
            style={{
              cursor: 'pointer'
            }}
          >
            <h1 className="small-rectangle-heading">{demographicData.gender}</h1>
            <h1 className="small-rectangle-heading">Sex</h1>
          </div>
        </div>
        <div className="summary-rectangle">
          <h1 className="summary-rectangle-header">
            {demographicData[activeSection]}
          </h1>
          <div className="donut-chart">
            <DonutChart percentage={getActiveConfidence()} />
          </div>
        </div>
        <div className="right-side-rectangle">
          <div className="right-side-top-text">
            <h1 className="left-header-text">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </h1>
            <h1 className="right-header-text">A.I. Confidence</h1>
          </div>
          {getActiveProbabilities().map((item, index) => (
            <div 
              key={index} 
              className={`data-results-box ${item.label.toLowerCase() === demographicData[activeSection].toLowerCase() ? 'active' : ''}`}
              onClick={() => {
                setDemographicData(prev => ({
                  ...prev,
                  [activeSection]: item.label
                }));
              }}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <object
                  type="image/svg+xml"
                  data={item.label.toLowerCase() === demographicData[activeSection].toLowerCase() ? 
                    "radio-button.svg" : "radio-button (1).svg"}
                  width="12"
                  height="12"
                  style={{ pointerEvents: 'none' }}
                ></object>
                <p style={{ margin: 0 }}>{item.label}</p>
              </div>
              <p>{item.probability} %</p>
            </div>
          ))}
        </div>
        
        <button className="back-button" onClick={() => navigate("/analysis")}>
          <object
            className="back-button-icon"
            type="image/svg+xml"
            data="button-icon-shrunk.svg"
            width="40"
            height="40"
          ></object>
          <span className="back-button-text">
          Back
          </span>
        </button>
        <p className="correction-text">If A.I. estimate is wrong, select the correct one.</p>
        <div className="action-buttons">
          <button className="reset-button">Reset</button>
          <button className="confirm-button">Confirm</button>
        </div>
      </div>
    </div>
  );
}

export default Demographics;
