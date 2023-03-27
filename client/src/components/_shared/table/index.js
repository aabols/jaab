import React from 'react';

export default function Table({ headings, contents }) {
    return (
        <table>
            <thead>
                <tr>
                    {headings.map((heading, index) => (
                        <th key={index}> {
                            typeof heading === 'object'
                                ? heading[Object.keys(heading)[0]]
                                : heading
                        }</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {contents.map((content, index) => (
                    <tr key={index}>
                        {headings.map((heading, index) => (
                            <td key={index}>{
                                typeof heading === 'object'
                                    ? content[Object.keys(heading)[0]]
                                    : content[heading]
                            }</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
