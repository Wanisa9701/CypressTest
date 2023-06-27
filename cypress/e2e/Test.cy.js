
describe('CypressTest', () => {
    beforeEach(()=>{
      cy.visit('https://the-internet.herokuapp.com/')
    })
    it('File Upload',() => {
        cy.contains('File Upload').click()
        cy.get('input[type=file]').attachFile('home.png')
        cy.get('#file-submit').click({force: true})
    })
    it('Multiple Windows',() => {
        cy.contains('Multiple Windows').click()
        cy.wait(1000)
        cy.contains('Click Here').click()
    })
    it('Sortable Data Tables',() => {
        var beforeSort = []
        var afterSort = []
        cy.contains('Sortable Data Tables').click()
        cy.get('#table1 > tbody > tr').should('have.length',4)
        // cy.log('**sort by Last Name**')
        cy.contains('.header', 'Last Name').click()
        cy.wait(1000)
        cy.get('#table1 > tbody > tr').should('have.length',4)
        cy.wait(1000)
        cy.get('#table2 > tbody > tr').should('have.length',4) 
        cy.get('.last-name').each(($ele) => {
            if($ele.text() !== 'Last Name'){
                beforeSort.push($ele.text())
            }
        })
        cy.get('.last-name').eq(0).click()
        cy.get('.last-name').each(($ele) => {
            if($ele.text() !== 'Last Name'){
                afterSort.push($ele.text())
            }
        }).then(() => {
            expect(beforeSort.sort()).to.deep.eq(afterSort)
        })

    })
    

})