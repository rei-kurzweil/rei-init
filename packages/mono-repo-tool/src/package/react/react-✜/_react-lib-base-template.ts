export default function _reactLibBaseTemplate(library_name: string) {

    // split library-name by hyphen and capitalize each word, then join them together
    const library_main_component_name = library_name.split('-')
                                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                                    .join('');

    return `export default function ${library_main_component_name}() {
    
    return (
        <></>
    );
    `;

} 