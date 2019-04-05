const { RichText, MediaUpload, AlignmentToolbar, BlockControls, PlainText } = wp.editor;
const { registerBlockType } = wp.blocks;
const { Button } = wp.components;
const { __, setLocaleData } = wp.i18n;

// no need to import scss files here, build task will create them. 
// they get enqueued into WP via index.php
// import './style.scss';
// import './editor.scss';

registerBlockType('qm-blocks/content-area', {   

    title: __( 'Content Area', 'qm-blocks' ),
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
        },
        alignment: {
			type: 'string',
			default: 'none',
		},
    },

    edit: props => {

        const { attributes, className, setAttributes } = props;

        const getImageButton = ( openEvent ) => {
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

        const onChangeAlignment = ( newAlignment ) => {
            console.log('change alignment event');
			props.setAttributes( { alignment: newAlignment === undefined ? 'none' : newAlignment } );
        };
        
        return (
            <div className={ `content-area content-area-align-${ attributes.alignment }` }>
                {
					<BlockControls>
						<AlignmentToolbar
							value={ attributes.alignment }
							onChange={ content => setAttributes({ alignment: content }) }
						/>
					</BlockControls>
				}

                <figure>
                    <MediaUpload
                        onSelect={ media => { setAttributes({ imageAlt: media.alt, imageUrl: media.url }); } }
                        type="image"
                        value={ attributes.imageID }
                        render={ ({ open }) => getImageButton(open) }
                    />
                </figure>

                <div className="content-area-content">
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

            </div>
        );
    },

    save: ( { attributes, className } ) => {

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
            <div className={ `content-area content-area-align-${ attributes.alignment }` }>
                <figure>{ contentImage( attributes.imageUrl, attributes.imageAlt ) }</figure>
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