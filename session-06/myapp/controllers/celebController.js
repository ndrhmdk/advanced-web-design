const celebs = [
    {id: 1, name: 'Robert Pattinson', netWorth: 30_000_000},
    {id: 2, name: 'Taylor Swift', netWorth: 1_000_000_000},
    {id: 3, name: 'Sadie Sink', netWorth: 5_000_000},
    {id: 4, name: 'Shawn Mendes', netWorth: 50_000_000}
];

exports.getCelebs = (req, res) => {
    res.render('celeb', { celebs });
};

exports.getCelebsbById = (req, res) => {
    const celeb = celebs.find(p => p.id == req.params.id);
    if (celeb) {
        res.send(`<h1>${celeb.name}</h1><p>Net worth: $${celeb.netWorth}</p>`);
    } else {
        res.send('<h1>Celeb not found.</h1>');
    }
};
