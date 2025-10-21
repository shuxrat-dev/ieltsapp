
import React from 'react';
import { Card } from './ui/Card';
import { BAND_DESCRIPTORS } from '../constants';

export const Learn: React.FC = () => {
    return (
        <div className="space-y-8">
            <Card>
                <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-400">
                    Understanding IELTS Band Descriptors
                </h2>
                <p className="text-secondary-light dark:text-secondary-dark mb-8">
                    Knowing what examiners look for at each band level is crucial for success. Here's a breakdown of the public band descriptors for writing.
                </p>
                <div className="space-y-6">
                    {Object.entries(BAND_DESCRIPTORS).reverse().map(([band, description]) => (
                        <div key={band} className="p-4 border border-border-light dark:border-border-dark rounded-lg bg-bkg-light dark:bg-bkg-dark/50">
                            <h3 className="font-bold text-xl">
                                <span className="inline-block w-10 h-10 text-center leading-10 rounded-full bg-gradient-to-tr from-blue-500 to-red-500 text-white mr-4">
                                    {band}
                                </span>
                                Band {band}
                            </h3>
                            <p className="mt-2 ml-14 text-secondary-light dark:text-secondary-dark">{description}</p>
                        </div>
                    ))}
                </div>
            </Card>

            <Card>
                <h2 className="text-3xl font-bold mb-4">Upcoming Features</h2>
                <ul className="list-disc list-inside space-y-2 text-secondary-light dark:text-secondary-dark">
                    <li>Weakness Drills: Targeted micro-practice based on your essay feedback.</li>
                    <li>Synonym and Paraphrase Assistant.</li>
                    <li>Cohesion Analyzer to improve flow.</li>
                    <li>A full library of high-scoring sample essays.</li>
                </ul>
            </Card>
        </div>
    );
};
