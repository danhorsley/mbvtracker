import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Image, Box, LayoutGrid, Camera, Check, AlertCircle, Layers } from 'lucide-react';
import SpriteExtractor from './SpriteExtractor';

const SceneTracker = () => {
  const [activeTab, setActiveTab] = useState('scenes');
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [completedScenes, setCompletedScenes] = useState(new Set());

  const phases = [
    {
      name: "Phase 1 - Core Base Structure",
      description: "Essential lunar base components needed for early scenes",
      priority: "High",
      scenes: [
        {
          name: "Base Exterior - Establishing Shot",
          steps: ["Basic Blender model", "Lighting setup", "Crater environment", "Final render"],
          dependencies: [],
          difficulty: "Medium",
          timeEstimate: "2-3 days"
        },
        {
          name: "Command Center",
          steps: ["Room layout", "Equipment modeling", "Character positions", "Lighting"],
          dependencies: ["Base Exterior"],
          difficulty: "High",
          timeEstimate: "3-4 days"
        },
        {
          name: "Main Corridors",
          steps: ["Corridor system", "Lighting", "Wear and tear", "Props"],
          dependencies: [],
          difficulty: "Low",
          timeEstimate: "1-2 days"
        }
      ]
    },
    {
      name: "Phase 2 - Character Spaces",
      description: "Personal areas for character development",
      priority: "Medium",
      scenes: [
        {
          name: "Living Quarters",
          steps: ["Room layouts", "Personal effects", "Lighting variations"],
          dependencies: ["Main Corridors"],
          difficulty: "Medium",
          timeEstimate: "2-3 days"
        },
        {
          name: "Rachel's Office",
          steps: ["Psychology office setup", "Personal details", "Mood lighting"],
          dependencies: ["Living Quarters"],
          difficulty: "Medium",
          timeEstimate: "2 days"
        }
      ]
    },
    {
      name: "Phase 3 - The Pyramid",
      description: "Core story progression environments",
      priority: "High",
      scenes: [
        {
          name: "Pyramid Exterior",
          steps: ["Basic structure", "Surface details", "Lighting setup", "Atmosphere"],
          dependencies: ["Base Exterior"],
          difficulty: "High",
          timeEstimate: "4-5 days"
        },
        {
          name: "Birth Chamber",
          steps: ["Chamber design", "Tech elements", "Organic elements", "Lighting"],
          dependencies: ["Pyramid Exterior"],
          difficulty: "Very High",
          timeEstimate: "5-6 days"
        }
      ]
    }
  ];

  const toggleCategory = (index) => {
    setExpandedCategory(expandedCategory === index ? null : index);
  };

  const toggleSceneComplete = (sceneName) => {
    const newCompleted = new Set(completedScenes);
    if (newCompleted.has(sceneName)) {
      newCompleted.delete(sceneName);
    } else {
      newCompleted.add(sceneName);
    }
    setCompletedScenes(newCompleted);
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Low': 'text-green-500',
      'Medium': 'text-yellow-500',
      'High': 'text-orange-500',
      'Very High': 'text-red-500'
    };
    return colors[difficulty] || 'text-gray-500';
  };

  return (
    <div className="w-full max-w-4xl p-4 space-y-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="flex space-x-4">
              <button
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  activeTab === 'scenes' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('scenes')}
              >
                <LayoutGrid className="w-5 h-5" />
                <span>Scenes</span>
              </button>
              <button
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  activeTab === 'sprites' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('sprites')}
              >
                <Layers className="w-5 h-5" />
                <span>Sprite Tools</span>
              </button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeTab === 'scenes' ? (
            <div className="space-y-6">
              {phases.map((phase, phaseIndex) => (
                <div key={phase.name} className="border rounded-lg p-4">
                  <div 
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleCategory(phaseIndex)}
                  >
                    <div>
                      <h3 className="text-lg font-semibold">{phase.name}</h3>
                      <p className="text-sm text-gray-600">{phase.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">Priority: {phase.priority}</span>
                    </div>
                  </div>

                  {expandedCategory === phaseIndex && (
                    <div className="mt-4 space-y-4">
                      {phase.scenes.map((scene) => (
                        <div 
                          key={scene.name}
                          className="border rounded p-3 bg-gray-50"
                        >
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <div 
                                  className="cursor-pointer"
                                  onClick={() => toggleSceneComplete(scene.name)}
                                >
                                  {completedScenes.has(scene.name) ? 
                                    <Check className="w-5 h-5 text-green-500" /> : 
                                    <Box className="w-5 h-5 text-gray-400" />
                                  }
                                </div>
                                <h4 className="font-medium">{scene.name}</h4>
                              </div>
                              <div className="text-sm text-gray-600">
                                Time Estimate: {scene.timeEstimate}
                              </div>
                              <div className={`text-sm ${getDifficultyColor(scene.difficulty)}`}>
                                Difficulty: {scene.difficulty}
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-2">
                            <h5 className="text-sm font-medium">Steps:</h5>
                            <div className="grid grid-cols-2 gap-2 mt-1">
                              {scene.steps.map((step, stepIndex) => (
                                <div 
                                  key={stepIndex}
                                  className="text-sm bg-white p-2 rounded border"
                                >
                                  {step}
                                </div>
                              ))}
                            </div>
                          </div>

                          {scene.dependencies.length > 0 && (
                            <div className="mt-2 text-sm text-gray-600">
                              Dependencies: {scene.dependencies.join(', ')}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <SpriteExtractor />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SceneTracker;