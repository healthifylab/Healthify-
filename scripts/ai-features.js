async function callFlowiseAPI(prompt) {
    const response = await fetch('https://your-flowise-endpoint/api/v1/prediction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: prompt, context: yourTestsData })
    });
    const data = await response.json();
    return data.response;
}
