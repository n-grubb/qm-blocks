const { RichText, MediaUpload, PlainText } = wp.editor;
const { registerBlockType } = wp.blocks;
const { Button } = wp.components;

// no need to import scss files here, build task will create them. 
// they get enqueued into WP via index.php
// import './style.scss';
// import './editor.scss';

registerBlockType('qm-blocks/content-area', {   
    title: 'Content Area',
    icon: 'layout',
    category: 'common',

    attributes: {
        title: {
            source: 'text',
            selector: '.content-area-title'
        },
        body: {
            type: 'array',
            source: 'children',
            selector: '.content-area-body'
        },
        buttonText: {
            source: 'text',
            selector: '.content-area-button-text'
        },
        imageAlt: {
            attribute: 'alt',
            selector: '.content-area-image'
        },
        imageUrl: {
            attribute: 'src',
            selector: '.content-area-image'
        }
    },

    edit( { attributes, className, setAttributes } ) {

        const getImageButton = (openEvent) => {
            if(attributes.imageUrl) {
                return (
                    <img 
                        src={ attributes.imageUrl }
                        onClick={ openEvent }
                        className="image"
                    />
                );
            }
            else {
                return (
                    <div className="button-container">
                        <Button 
                            onClick={ openEvent }
                            className="button button-large"
                        >
                            Select an image
                        </Button>
                     </div>
                );
            }
        };

        return (
            <div className="content-area-block container">
                
                <MediaUpload
                    onSelect={ media => { setAttributes({ imageAlt: media.alt, imageUrl: media.url }); } }
                    type="image"
                    value={ attributes.imageID }
                    render={ ({ open }) => getImageButton(open) }
                />

                <PlainText
                    onChange={ content => setAttributes({ title: content }) }
                    value={ attributes.title }
                    placeholder="Content Header"
                    className="heading"
                />

                <RichText
                    onChange={ content => setAttributes({ body: content }) }
                    value={ attributes.body }
                    multiline="p"
                    placeholder="content body here."
                />

            </div>
        );
    },

    save( { attributes } ) {

        const contentImage = (src, alt) => {
            if (!src) return null;
        
            if (alt) {
                return (
                    <img 
                        className="content-area-image" 
                        src={ src }
                        alt={ alt }
                    /> 
                );
            }
            
            // No alt set, so let's hide it from screen readers
            return (
                <img 
                    className="content-area-image" 
                    src={ src }
                    alt=""
                    aria-hidden="true"
                /> 
            );
        };
          
        return (
            <div className="content-area-block">
                { contentImage( attributes.imageUrl, attributes.imageAlt ) }
                <div className="content-area-content">
                    <h3 className="content-area-title">{ attributes.title }</h3>
                    <div className="content-area-body">
                        { attributes.body }
                    </div>
                </div>
            </div>
        );
    }
});