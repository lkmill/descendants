import descendants from '../src/index.mjs'

const strs = ['zero', 'one', 'two', 'three', 'four']

const html = `
${strs[0]}

<div id='a-1' class='a a-1'>
  ${strs[1]}
  
  <div id='a-2' class='a a-2'>
    ${strs[2]}

    <div id='a-3' class='a a-3'>
      ${strs[3]}

      <div id='a-4' class='a a-4'>
        ${strs[4]}
      </div>
    </div>
  </div>
</div>
`
  .trim()
  .split(/>\s+</)
  .join('><')
  .split(/>\s+(?=\w)/)
  .join('>')
  .replace(/(\w)\s+</g, '$1<')

document.body.innerHTML = html

const a1 = document.getElementById('a-1')
const a2 = document.getElementById('a-2')
const a3 = document.getElementById('a-3')
const a4 = document.getElementById('a-4')

test('basic check', () => {
  let result = descendants(a1, {
    selector: '#a-1',
  })

  expect(result).toEqual([])

  result = descendants(a1, {
    nodeType: 1,
  })

  expect(result).toEqual([a2, a3, a4])

  result = descendants(a1, {
    nodeType: 3,
  }).map((node) => node.textContent)

  expect(result).toEqual(strs.slice(1))

  result = descendants(a1, {
    nodeType: 1,
    levels: 1,
  })

  expect(result).toEqual([a2])

  result = descendants(a1, {
    selector: '.a-3',
  })

  expect(result).toEqual([a3])

  result = descendants(a1, {
    selector: '.a',
  })

  expect(result).toEqual([a2, a3, a4])

  result = descendants(a1, {
    selector: '#a-2',
  })

  expect(result).toEqual([a2])

  result = descendants(a1, {
    filter: () => false,
  })

  expect(result.length).toBe(0)

  result = descendants(a1, {
    filter: () => true,
  })

  expect(result.length).toBe(7)
})
