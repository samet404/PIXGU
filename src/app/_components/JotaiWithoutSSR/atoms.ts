import { atom } from 'jotai'

export const textAtom = atom<string>('hello world from textAtom')
export const countAtom = atom<number>(0)

export const readonlyUppercaseAtom = atom((get) => get(textAtom).toUpperCase())
/*
    Read Only atoms

    Readonly atoms are used to read the value of the other atoms. You can't set or change their value directly because these atoms rely on their parent atoms.


    const textAtom = atom('readonly');
    const uppercase = atom((get) => get(textAtom).toUpperCase());

    These atoms takes a callback with a paramater get which allows us to read other atoms value. Changing the parent's value will also update the derived atom.


    const firstName = atom('John');
    const lastName = atom('Harris');
    const fullName = atom((get) => get(firstName) + " " + get(lastName));

    You can do more than just simply read the value of other atoms like filter and sorted out them or map over the values of the parent atom. And this is the beauty of it, Jotai gracefully lets you create dumb atoms derivated from even more dumb atoms.
    Here is a example of getting the list of all online and offline friends.


    const friendsStatus = atom([ 
    { name: "John", online: true },
    { name: "David", online: false },
    { name: "Micheal", online: true } 
    ]);

    const onlineFriends = atom((get) => get(friendsStatus).filter((item) => item.online));
    const offlineFriends = atom((get) => get(friendsStatus).filter((item) => !item.online));
*/

export const writeonlyUppercaseAtom = atom(null, (get, set) => {
  set(textAtom, get(textAtom).toUpperCase())
  console.log('writeonlyUppercaseAtom')
})

export const writeonlyAddCountAtom = atom(null, (get, set, update: number) => {
  set(countAtom, get(countAtom) + update)
})

/*
    Write Only atoms

    With the help of writeOnly atoms you can modify the atoms it relies on. It's basically a two-way data binding, changing the derived atom also changes the parent atom and vice-versa, so use these atoms very carefully.


    const textAtom = atom('write only atoms')
    const uppercase = atom(null, (get, set) => {
        set(textAtom, get(textAtom).toUpperCase())
    })

    The first value of the callback is always be null and second is the function to modify the atom value. Let's take a more practical use case of write-only atoms.


    Here we define a dotsAtom which is an atom of positions of points we draw on the canvas and a drawing atom.


    const dotsAtom = atom([]);
    // true when we drawing on canvas
    const drawingAtom = atom(false);

    The handleMouseDownAtom and handleMouseUpAtom are two write-only atom that we use to set the value of drawing atom and handleMouseMoveAtom is a write-only atom which adds the position of new points to the dotsArray atom when we drawing on the canvas.


    const handleMouseMoveAtom = atom(
    null,
    (get, set, update: Point) => {
        if (get(drawingAtom)) {
        set(dotsAtom, (prev) => [...prev, update]);
        }
    }
    );

    Note: You must be thinking that why we not updating the atoms value directly, why we use a write-only atom to update it's value. Well updating the value using the write-only atom prevents the extra rerenders in our app.
*/
