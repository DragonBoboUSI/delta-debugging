let htmlPage =
    '<td align=left valign=top>' +
    '<SELECT NAME="op sys" MULTIPLE SIZE=7>' +
    '<OPTION VALUE="All">All<OPTION VALUE="Windows 3.1">Windows 3.1' +
    '<OPTION VALUE="Windows 95">Windows 95<OPTION VALUE="Windows 98">' +
    'Windows 98<OPTION VALUE="Windows ME">Windows ME<OPTION VALUE="Windows 2000">' +
    'Windows 2000<OPTION VALUE="Windows NT">Windows NT<OPTION VALUE="Mac System 7">' +
    'Mac System 7<OPTION VALUE="Mac System 7.5">Mac System 7.5<OPTION VALUE="Mac System 7.6.1">' +
    'Mac System 7.6.1<OPTION VALUE="Mac System 8.0">Mac System 8.0<OPTION VALUE="Mac System 8.5">' +
    'Mac System 8.5<OPTION VALUE="Mac System 8.6">Mac System 8.6<OPTION VALUE="Mac System 9.x">Mac System 9.x' +
    '<OPTION VALUE="MacOS X">MacOS X<OPTION VALUE="Linux">Linux<OPTION VALUE="BSDI">BSDI<OPTION VALUE="FreeBSD">' +
    'FreeBSD<OPTION VALUE="NetBSD">NetBSD<OPTION VALUE="OpenBSD">OpenBSD<OPTION VALUE="AIX">AIX<OPTION VALUE="BeOS">' +
    'BeOS<OPTION VALUE="HP-UX">HP-UX<OPTION VALUE="IRIX">IRIX<OPTION VALUE="Neutrino">Neutrino<OPTION VALUE="OpenVMS">' +
    'OpenVMS<OPTION VALUE="OS/2">OS/2<OPTION VALUE="OSF/1">OSF/1<OPTION VALUE="Solaris">Solaris<OPTION VALUE="SunOS">' +
    'SunOS<OPTION VALUE="other">other</SELECT>' +
    '</td>' +
    '<td align=left valign=top>' +
    '<SELECT NAME="priority" MULTIPLE SIZE=7>' +
    '<OPTION VALUE="--">--<OPTION VALUE="P1">P1<OPTION VALUE="P2">P2<OPTION VALUE="P3">P3<OPTION VALUE="P4">' +
    'P4<OPTION VALUE="P5">P5</SELECT>' +
    '</td>' +
    '<td align=left valign=top>' +
    '<SELECT NAME="bug severity" MULTIPLE SIZE=7>' +
    '<OPTION VALUE="blocker">blocker<OPTION VALUE="critical">critical<OPTION VALUE="major">major<OPTION VALUE="normal">' +
    'normal<OPTION VALUE="minor">minor<OPTION VALUE="trivial">trivial<OPTION VALUE="enhancement">enhancement</SELECT></tr></table>';

const testString =
    '08315701551nfoapf1d124241e019u2eni10djiq091ji028194851201812058y1hd01802ej10d9j210dj102dj';
const test = (input: string) => input.includes('<SELECT>');

let iterations = 0;
const debug: (granularity: number, input: string) => null | string = (
    granularity,
    input,
) => {
    console.log(
        `\nIteration n.${++iterations}: Granularity of ${granularity} on input ${input}`,
    );
    if (granularity <= 0) {
        return input;
    }
    let start = 0;
    const step = Math.floor(input.length / granularity);
    while (start + step <= input.length) {
        const delta = input.substring(start, start + step);
        const nabla = input.substring(0, start) + input.substring(start + step);
        console.log(`\tdelta${start}: ${delta}\n\tnabla${start}: ${nabla}`);
        start += 1;
        const testDelta = test(delta);
        const testNabla = test(nabla);

        // 3.a
        if (testDelta) {
            return debug(2, delta);
        }
        // 3.b
        if (testNabla) {
            return debug(Math.max(granularity - 1, 2), nabla);
        }
    }
    // 3.c
    if (granularity * 2 <= input.length) {
        return debug(granularity * 2, input);
    }
    return input;
};

console.log(debug(2, htmlPage));
